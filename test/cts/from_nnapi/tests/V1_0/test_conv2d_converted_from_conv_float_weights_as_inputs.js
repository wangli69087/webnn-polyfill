'use strict';
import * as utils from '../../../../utils.js';

/* eslint-disable max-len */
describe('CTS converted from NNAPI CTS', function() {
  const context = navigator.ml.createContext();

  it('test conv2d (fused ops) converted from conv_float_weights_as_inputs test', function() {
    // Converted test case (from: V1_0/conv_float_weights_as_inputs.mod.py)
    const builder = new MLGraphBuilder(context);
    const op1 = builder.input('op1', {type: 'float32', dimensions: [1, 3, 3, 1]});
    const op1Data = new Float32Array([1.0, 1.0, 1.0, 1.0, 0.5, 1.0, 1.0, 1.0, 1.0]);
    const op2 = builder.input('op2', {type: 'float32', dimensions: [1, 2, 2, 1]});
    const op2Data = new Float32Array([0.25, 0.25, 0.25, 0.25]);
    const op3 = builder.input('op3', {type: 'float32', dimensions: [1]});
    const op3Data = new Float32Array([0]);
    const pad0 = 0;
    const stride = 1;
    const expected = [0.875, 0.875, 0.875, 0.875];
    const op4 = builder.conv2d(op1, op2, {'bias': op3, 'padding': [pad0, pad0, pad0, pad0], 'strides': [stride, stride], 'inputLayout': 'nhwc', 'filterLayout': 'ohwi'});
    const graph = builder.build({op4});
    const outputs = {op4: new Float32Array(utils.sizeOfShape([1, 2, 2, 1]))};
    graph.compute({'op1': op1Data, 'op2': op2Data, 'op3': op3Data}, outputs);
    utils.checkValue(outputs.op4, expected, utils.ctsFp32RestrictAccuracyCriteria);
  });
});
/* eslint-disable max-len */
