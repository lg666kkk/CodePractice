import { parser, stringity} from '../../src/code/parser'
// mocha + chai(断言库)
import {expect} from 'chai'
/**
 * it() 表示一个用例
 */
// to.be xxx
// deep.equal  表示两个对象是否相等
describe('专门测试parser', () => {
  it('我要测试parser是否靠谱', async () => {
    expect(parser('name=aaaa')).to.be.deep.equal({"name":"aaaa"})
  })
})
// 常见的关系 相等、不相等、大于、小于、包含、不包含

describe('专门测试stringity是否靠谱', () => {
  it('我要测试stringity是否靠谱', async () => {
    expect(stringity({name:'ssss'})).to.be.equal('name=ssss')
  })
})

describe('测试方法', () => {
  it('相等关系', async () => {
    expect(1+1).to.be.equal(2)
    expect([1,2,3]).to.be.lengthOf(3) // 测试数组长度
    expect(true).to.be.true
  })
  it('包含', () => {
    expect('zxxsd').to.be.contain('xx')
    //expect('zxxx').to.be.match('/zxx/')
  })
  it('大于', () => {
    expect(5).to.be.greaterThan(3) // 大于等于
    expect(3).to.be.lessThan(33) // 小于等于
    expect(3).to.be.not.greaterThan(33) // 不大于
  })
})
