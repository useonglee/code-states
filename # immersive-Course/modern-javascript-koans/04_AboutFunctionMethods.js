const { expect } = require("chai");
const sinon = require('sinon')
const FILL_ME_IN = 'FILL_ME_IN'

describe('함수 메소드에 관해서', () => {

  function foo() {
    return 'bar'
  }

  it('함수에도 메소드가 있습니다', () => {
    expect(foo).to.have.property('call')
    expect(foo).to.have.property('apply')
    expect(foo).to.have.property('bind')

    expect(foo()).to.eql("bar")
    expect(foo.call()).to.eql("bar")
    expect(foo.apply()).to.eql("bar")
    expect(foo.bind()).to.exist
  })

  // 이 세가지 메소드는 전부 this와 관련이 있습니다
})

describe('call에 관해서', () => {

  it('call의 첫번째 인자 값을 확인합니다', () => {
    function foo() {
      return this;
    }

    const context1 = { msg: 'welcome everyone' }
    const context2 = { msg: 'good bye' }

    expect(foo.call(context1)).to.eql({msg: "welcome everyone"})
    expect(foo.call(context2).msg).to.eql('good bye')
    expect(foo.call(null)).to.eql(global)
  })

  it('call의 두번째 인자 이후로는 파라미터로 전달됩니다', () => {
    function printProfile(name, age, ...args) {
      return `${this.type} ${name} 나이:${age}${args.length === 0 ? '' : ' ' + this.feature + ':' + args.join(',')}`
    }

    const developer = { type: '개발자', feature: '언어' }
    const artist = { type: '아티스트', feature: '노래' }

    expect(printProfile.call(developer, '김코딩', 30)).to.eql("개발자 김코딩 나이:30")
    expect(printProfile.call(developer, '박해커', 20, 'JavaScript')).to.eql("개발자 박해커 나이:20 언어:JavaScript")
    expect(printProfile.call(artist, 'BTS', 7, 'ON', 'Dynamite')).to.eql("아티스트 BTS 나이:7 노래:ON,Dynamite")
  })
})

describe('apply에 관해서', () => {
  it('apply의 첫번째 인자 값을 확인합니다', () => {
    function foo() {
      return this;
    }
    const context = { msg: 'welcome you!' }

    expect(foo.apply(context)).to.eql({msg: 'welcome you!'})
    expect(foo.apply()).to.eql(global)
  })

  it('apply의 두번째 인자는 배열입니다', () => {
    function printProfile(name, age, ...args) {
      return `${this.type} ${name} 나이:${age}${args.length === 0 ? '' : ' ' + this.feature + ':' + args.join(',')}`
    }

    const developer = { type: '개발자', feature: '언어' }
    const artist = { type: '아티스트', feature: '노래' }

    expect(printProfile.apply(developer, ["김코딩", 30])).to.eql('개발자 김코딩 나이:30')
    expect(printProfile.apply(developer, ["박해커", 20, "JavaScript"])).to.eql('개발자 박해커 나이:20 언어:JavaScript')
    expect(printProfile.apply(artist, ["BTS", 7, "ON", "Dynamite"] )).to.eql('아티스트 BTS 나이:7 노래:ON,Dynamite')
  })
});

describe('bind에 관해서', () => {

  function foo(a, b) {
    return this + (a ? a : '') + (b ? b : '')
  }

  it('bind는 함수를 실행하지 않고, this 컨텍스트를 담은 함수를 리턴합니다', () => {
    const context = 'almost finish'

    const boundFoo = foo.bind(context)
    expect(typeof boundFoo).to.eql("function")
    expect(boundFoo()).to.eql("almost finish")
  })

  it('bind의 인자 순서는 call과 동일합니다', () => {
    const context = 'bind'

    const boundFoo = foo.bind(context, ' is', ' useful')
    expect(boundFoo()).to.eql("bind is useful")
  })
})

describe('call, apply의 유용한 예제를 확인합니다', () => {

  const array1 = ['code', 'states']
  const array2 = ['immersive', 'course']
  const arrayNumbers = [5, 10, 4, 9]

  it('spread operator, rest parameter가 탄생하기 이전엔 apply가 많이 쓰였습니다', () => {
    expect(array1.concat(array2)).to.eql(['code', 'states', 'immersive', 'course'])
    expect([...array1, ...array2]).to.eql(['code', 'states', 'immersive', 'course'])
    expect(Math.max(...arrayNumbers)).to.eql(10)
    expect(Math.max.apply(null, arrayNumbers)).to.eql(10)
  })

  it('prototype의 기능을 빌려 쓸 수 있습니다', () => {
    expect(Array.prototype.concat.call(array1, array2, arrayNumbers)).to.eql(['code', 'states', 'immersive', 'course', 5, 10, 4, 9])
    expect(Array.prototype.concat.apply(array1, [array2])).to.eql(['code', 'states', 'immersive', 'course'])
  })

  it('유사 배열을 다루기에 용이합니다', () => {
    const nodeList = {
      length: 3,
      0: 'div#target',
      1: 'li',
      2: 'span#new'
    };

    expect(Array.prototype.slice.apply(nodeList, [0, 1])).to.eql(["div#target"])
    expect(Array.prototype.map.call(nodeList, node => node.split('#')[0])).to.eql(["div", "li", "span"])
  })
})

describe('bind의 유용한 예제를 확인합니다', () => {
  let clock
  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    clock.restore()
  })

  it('callback에 인자를 전달하기에 유용합니다', () => {

    const users = [
      { name: '김코딩' },
      { name: '박해커' },
      { name: '최초보' }
    ]
    const result = []

    function createUserButton() {
      return {
        trigger: function () {
          this.onclick()
        }
      }
    }

    function handleClick() {
      result.push(this.name)
    }

    function callback(user) {
      let btn = createUserButton(user)
      btn.onclick = handleClick.bind(user, user.name) // 이 부분을 bind를 이용해서 테스트가 통과하도록 바꿔보세요
      btn.trigger()
    }

    users.forEach(callback)

    expect(callback.toString()).to.include('bind')
    expect(result).to.eql(['김코딩', '박해커', '최초보'])

  })

  it('setTimeout에 this 컨텍스트를 전달하기에 유용합니다', function () {
    const result = [];
    function pushCount() {
      this.count++
      result.push(this.count)        
    }

    const counter = { count: 0 }

    setTimeout(() => {
      pushCount.call(counter)
    }, 1000)

    clock.tick(1001) // 1초가 흘렀습니다
    expect(result).to.eql([1])

    setTimeout(pushCount.bind(counter), 1000)

    clock.tick(1001) // 1초가 흘렀습니다
    expect(result).to.eql([1, 2])
  })
})
