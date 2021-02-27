const { expect } = require("chai");
const FILL_ME_IN = 'FILL_ME_IN'

describe('this 키워드에 관해서', () => {
  it('메소드 호출시 this를 확인합니다', () => {
    // 객체의 속성 값으로 담긴 함수를 특별히 "메소드"라고 부릅니다
    // foo()     :함수
    // foo.bar() :메소드 함수

    const counter = {
      value: 0,
      increse: function () {
        this.value++
      },
      decrease: function () {
        this.value--
      },
      getValue: function () {
        return this.value
      }
    }

    counter.increse()
    counter.increse()
    counter.decrease()
    expect(counter.getValue()).to.eql(1)
  })

  it('화살표 함수로 작성된 메소드 호출시 this를 확인합니다', () => {
    module.exports.value = 100

    const counter = {
      value: 0,
      increse: () => {
        this.value++
      },
      decrease: () => {
        this.value--
      },
      getValue: () => {
        return this.value
      }
    }

    counter.increse()
    counter.decrease()
    counter.decrease()
    expect(counter.getValue()).to.eql(99)

    // 메소드 선언시에는 화살표 함수를 사용을 피하거나,
    // 화살표 함수를 사용할 경우 this 사용을 피해야 합니다
  })

  it('new 키워드를 이용해 함수를 호출할 수 있습니다', () => {
    // new 키워드를 이용해 호출할 경우에 해당 함수를 특별히 "생성자"라고 부릅니다

    let this_value_in_constructor;

    function Car(name, brand, color) {
      this.name = name;
      this.brand = brand;
      this.color = color;

      this_value_in_constructor = this;
    }

    const mycar = new Car('mini', 'bmw', 'red')
    expect(mycar.name).to.eql("mini")
    expect(mycar.brand).to.eql("bmw")
    expect(mycar.color).to.eql("red")
    expect(this_value_in_constructor).to.eql({name: "mini", brand: "bmw", color: "red"})

    const yourcar = new Car('911', 'porsche', 'black')
    expect(yourcar.name).to.eql("911")
    expect(yourcar.brand).to.eql("porsche")
    expect(yourcar.color).to.eql("black")
    expect(this_value_in_constructor).to.eql({name: "911", brand: "porsche", color: "black"})
  })
})