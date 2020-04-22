import HelloWorld from '../../src/components/HelloWorld.vue'
import { mount } from '@vue/test-utils'
import { expect } from 'chai'
describe('Hello world.vue', () => {
  it('传递属性后能否正常显示', async () => {
    let wrapper = mount(HelloWorld, {
      propsData: {msg: 'hello'}
    });
    expect(wrapper.find('h1').text()).to.be.contain('hello')
  })
})
