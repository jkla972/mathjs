// test abs
var assert = require('assert'),
    error = require('../../../lib/error'),
    math = require('../../../index');

describe('abs', function () {
  it('should return the abs value of a boolean', function () {
    assert.strictEqual(math.abs(true), 1);
    assert.strictEqual(math.abs(false), 0);
  });

  it('should return the abs value of null', function () {
    assert.strictEqual(math.abs(null), 0);
  });

  it('should return the abs value of a number', function () {
    assert.strictEqual(math.abs(-4.2), 4.2);
    assert.strictEqual(math.abs(-3.5), 3.5);
    assert.strictEqual(math.abs(100), 100);
    assert.strictEqual(math.abs(0), 0);
  });

  it('should return the absolute value of a big number', function () {
    assert.deepEqual(math.abs(math.bignumber(-2.3)), math.bignumber(2.3));
    assert.deepEqual(math.abs(math.bignumber('5e500')), math.bignumber('5e500'));
    assert.deepEqual(math.abs(math.bignumber('-5e500')), math.bignumber('5e500'));
  });

  it('should return the absolute value of a complex number', function () {
    assert.equal(math.abs(math.complex(3, -4)), 5);
    assert.equal(math.abs(math.complex(1e200, -4e200)), 4.12310562561766e+200);
    assert.equal(math.norm(math.complex(-4e200, 1e200)), 4.12310562561766e+200);
  });

  it('should return the absolute value of all elements in an Array', function () {
    var a1 = math.abs([1,-2,3]);
    assert.ok(Array.isArray(a1));
    assert.deepEqual(a1, [1,2,3]);
    a1 = math.abs([-2,-1,0,1,2]);
    assert.ok(Array.isArray(a1));
    assert.deepEqual(a1, [2,1,0,1,2]);
  });

  it('should return the absolute value of all elements in a matrix', function () {
    var a1 = math.abs(math.matrix([1,-2,3]));
    assert.ok(a1 instanceof math.type.Matrix);
    assert.deepEqual(a1.size(), [3]);
    assert.deepEqual(a1.valueOf(), [1,2,3]);
    a1 = math.abs(math.matrix([-2,-1,0,1,2]));
    assert.ok(a1 instanceof math.type.Matrix);
    assert.deepEqual(a1.size(), [5]);
    assert.deepEqual(a1.valueOf(), [2,1,0,1,2])
  });

  it('should throw an error with a measurment unit', function () {
    assert.throws(function () {
      math.abs(math.unit(5, 'km'));
    });
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {math.abs()}, /TypeError: Too few arguments/);
    assert.throws(function () {math.abs(1, 2)}, /TypeError: Too many arguments/);
  });

  it('should throw an error in case of unsupported types', function () {
    assert.throws(function () {math.abs('a string');}, /TypeError: Unexpected type of argument/);
    assert.throws(function () {math.abs(undefined);}, /TypeError: Unexpected type of argument/);
  });

});