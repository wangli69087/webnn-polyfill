'use strict';
import * as utils from '../../../../utils.js';

/* eslint-disable max-len */
describe('CTS converted from NNAPI CTS', function() {
  const context = navigator.ml.createContext();

  it('test conv2d + add + clamp converted from conv_float_large test', function() {
    // Converted test case (from: V1_0/conv_float_large.mod.py)
    const builder = new MLGraphBuilder(context);
    const op1 = builder.input('op1', {type: 'float32', dimensions: [1, 2, 3, 3]});
    const op1Data = new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0]);
    const op2 = builder.constant({type: 'float32', dimensions: [3, 1, 1, 3]}, new Float32Array([1.0, 4.0, 7.0, 2.0, 5.0, 8.0, 3.0, 6.0, 9.0]));
    const op3 = builder.constant({type: 'float32', dimensions: [3]}, new Float32Array([0.0, 0.0, 0.0]));
    const pad0 = 0;
    const stride = 1;
    const expected = [30.0, 36.0, 42.0, 66.0, 81.0, 96.0, 102.0, 126.0, 150.0, 138.0, 171.0, 204.0, 174.0, 216.0, 258.0, 210.0, 261.0, 312.0];
    const interOut0 = builder.conv2d(op1, op2, {'padding': [pad0, pad0, pad0, pad0], 'strides': [stride, stride], 'inputLayout': 'nhwc', 'filterLayout': 'ohwi'});
    const interOut1 = builder.add(interOut0, op3);
    const op4 = builder.clamp(interOut1);
    const graph = builder.build({op4});
    const outputs = {op4: new Float32Array(utils.sizeOfShape([1, 2, 3, 3]))};
    graph.compute({'op1': op1Data}, outputs);
    utils.checkValue(outputs.op4, expected, utils.ctsFp32RestrictAccuracyCriteria);
  });
});
/* eslint-disable max-len */
