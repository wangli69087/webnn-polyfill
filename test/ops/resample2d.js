'use strict';
import * as utils from '../utils.js';

describe('test resample2d', function() {
  const context = navigator.ml.createContext();

  function testResample2d(input, options, expected) {
    const builder = new MLGraphBuilder(context);
    const x = builder.input('x', {type: 'float32', dimensions: input.shape});
    const y = builder.resample2d(x, options);
    const graph = builder.build({y});
    const inputs = {'x': new Float32Array(input.values)};
    const outputs = {'y': new Float32Array(utils.sizeOfShape(expected.shape))};
    graph.compute(inputs, outputs);
    utils.checkValue(outputs.y, expected.values);
  }

  it('resample2d upsample scales linear', function() {
    testResample2d(
        {
          shape: [1, 1, 2, 2],
          values: [1, 2, 3, 4],
        },
        {
          mode: 'linear',
          scales: [2.0, 2.0],
        },
        {
          shape: [1, 1, 4, 4],
          values: [
            1.,
            1.25,
            1.75,
            2.,
            1.5,
            1.75,
            2.25,
            2.5,
            2.5,
            2.75,
            3.25,
            3.5,
            3.,
            3.25,
            3.75,
            4.,
          ],
        });
  });

  it('resample2d upsample scales linear with explict axes [2, 3]', function() {
    testResample2d(
        {
          shape: [1, 1, 2, 2],
          values: [1, 2, 3, 4],
        },
        {
          mode: 'linear',
          scales: [2.0, 2.0],
          axes: [2, 3],
        },
        {
          shape: [1, 1, 4, 4],
          values: [
            1.,
            1.25,
            1.75,
            2.,
            1.5,
            1.75,
            2.25,
            2.5,
            2.5,
            2.75,
            3.25,
            3.5,
            3.,
            3.25,
            3.75,
            4.,
          ],
        });
  });

  it('resample2d upsample scales linear axes [0, 1]', function() {
    testResample2d(
        {
          shape: [2, 2, 1, 1],
          values: [1, 2, 3, 4],
        },
        {
          mode: 'linear',
          scales: [2.0, 2.0],
          axes: [0, 1],
        },
        {
          shape: [4, 4, 1, 1],
          values: [
            1.,
            1.25,
            1.75,
            2.,
            1.5,
            1.75,
            2.25,
            2.5,
            2.5,
            2.75,
            3.25,
            3.5,
            3.,
            3.25,
            3.75,
            4.,
          ],
        });
  });

  it('resample2d upsample scales linear axes [1, 2]', function() {
    testResample2d(
        {
          shape: [1, 2, 2, 1],
          values: [1, 2, 3, 4],
        },
        {
          mode: 'linear',
          scales: [2.0, 2.0],
          axes: [1, 2],
        },
        {
          shape: [1, 4, 4, 1],
          values: [
            1.,
            1.25,
            1.75,
            2.,
            1.5,
            1.75,
            2.25,
            2.5,
            2.5,
            2.75,
            3.25,
            3.5,
            3.,
            3.25,
            3.75,
            4.,
          ],
        });
  });

  it('resample2d upsample sizes linear', function() {
    testResample2d(
        {
          shape: [1, 1, 2, 2],
          values: [1, 2, 3, 4],
        },
        {
          mode: 'linear',
          sizes: [4, 4],
        },
        {
          shape: [1, 1, 4, 4],
          values: [
            1.,
            1.25,
            1.75,
            2.,
            1.5,
            1.75,
            2.25,
            2.5,
            2.5,
            2.75,
            3.25,
            3.5,
            3.,
            3.25,
            3.75,
            4.,
          ],
        });
  });

  it('resample2d upsample sizes linear explict axes [2, 3]', function() {
    testResample2d(
        {
          shape: [1, 1, 2, 2],
          values: [1, 2, 3, 4],
        },
        {
          mode: 'linear',
          sizes: [4, 4],
          axes: [2, 3],
        },
        {
          shape: [1, 1, 4, 4],
          values: [
            1.,
            1.25,
            1.75,
            2.,
            1.5,
            1.75,
            2.25,
            2.5,
            2.5,
            2.75,
            3.25,
            3.5,
            3.,
            3.25,
            3.75,
            4.,
          ],
        });
  });

  it('resample2d upsample sizes linear axes [0, 1]', function() {
    testResample2d(
        {
          shape: [2, 2, 1, 1],
          values: [1, 2, 3, 4],
        },
        {
          mode: 'linear',
          sizes: [4, 4],
          axes: [0, 1],
        },
        {
          shape: [4, 4, 1, 1],
          values: [
            1.,
            1.25,
            1.75,
            2.,
            1.5,
            1.75,
            2.25,
            2.5,
            2.5,
            2.75,
            3.25,
            3.5,
            3.,
            3.25,
            3.75,
            4.,
          ],
        });
  });

  it('resample2d upsample sizes linear axes [1, 2]', function() {
    testResample2d(
        {
          shape: [1, 2, 2, 1],
          values: [1, 2, 3, 4],
        },
        {
          mode: 'linear',
          sizes: [4, 4],
          axes: [1, 2],
        },
        {
          shape: [1, 4, 4, 1],
          values: [
            1.,
            1.25,
            1.75,
            2.,
            1.5,
            1.75,
            2.25,
            2.5,
            2.5,
            2.75,
            3.25,
            3.5,
            3.,
            3.25,
            3.75,
            4.,
          ],
        });
  });

  it('resample2d upsample sizes linear ignored scales', function() {
    testResample2d(
        {
          shape: [1, 1, 2, 2],
          values: [1, 2, 3, 4],
        },
        {
          mode: 'linear',
          scales: [3.0, 4.0],
          sizes: [4, 4],
        },
        {
          shape: [1, 1, 4, 4],
          values: [
            1.,
            1.25,
            1.75,
            2.,
            1.5,
            1.75,
            2.25,
            2.5,
            2.5,
            2.75,
            3.25,
            3.5,
            3.,
            3.25,
            3.75,
            4.,
          ],
        });
  });

  it('resample2d upsample scales nearest', function() {
    testResample2d(
        {
          shape: [1, 1, 2, 2],
          values: [1, 2, 3, 4],
        },
        {
          mode: 'nearest-neighbor',
          scales: [2.0, 3.0],
          axes: [2, 3],
        },
        {
          shape: [1, 1, 4, 6],
          values: [
            1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 2, 2,
            3, 3, 3, 4, 4, 4, 3, 3, 3, 4, 4, 4,
          ],
        });
  });

  it('resample2d upsample sizes nearest', function() {
    testResample2d(
        {
          shape: [1, 1, 2, 2],
          values: [1, 2, 3, 4],
        },
        {
          mode: 'nearest-neighbor',
          sizes: [4, 6],
          axes: [2, 3],
        },
        {
          shape: [1, 1, 4, 6],
          values: [
            1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 2, 2,
            3, 3, 3, 4, 4, 4, 3, 3, 3, 4, 4, 4,
          ],
        });
  });
});
