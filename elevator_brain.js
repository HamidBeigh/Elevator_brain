Vue.component('building',{
  template:`
  <div class="row">
    <div class="col-6">
      <b style="font-size: 2rem">Elev. A</b>
        <block1 @setDest="collectDestinations"
        @exit="emrExit"
        @setFloor="setOrigin"
        @moveTo = "movePassangers"
        v-for="b1_number in b1_numbers"
        :number="b1_number"
        :key="b1_number"
        :current="origin"
        :target="target"
        >
        </block1>
      </div>
      <div class="col-6">
        <b style="font-size: 2rem">Elev. B</b>
          <block2 @setDest2="collectDestinations2"
          @exit2="emrExit2"
          @setFloor2="setOrigin2"
          @moveTo2 = "movePassangers2"
          v-for="b2_number in b2_numbers"
          :number2="b2_number"
          :key="b2_number"
          :current2="origin2"
          :target2="target2"
          >
          </block2>
        </div>
    </div>
  `,
  data(){
    return{
      b1_numbers:[],
      origin:0,
      destinations:[],
      target:null,
      interval:null,
      direction:null,
      b2_numbers:[],
      origin2:0,
      destinations2:[],
      target2:null,
      interval2:null,
      direction2:null
    }
  },
  created(){
    for (i=9;i>-2;i--)
    this.b1_numbers.push(i)
    for (x=10;x>-1;x--)
    this.b2_numbers.push(x)
  },
  methods:{
    collectDestinations(destination_floor){
        this.destinations = this.destinations === undefined ? []:this.destinations
       if(this.destinations.indexOf(destination_floor) === -1){
         this.destinations.push(destination_floor)
      }
      // collectDestinations() collects the multiple destinations where the user wants to travel
    },
    targetFloor(d){
      this.target = d
    },
    // movePassangers() is invoked when the user clickes reset button and the user will reach on the destination
    movePassangers(){
      let newDestinations = this.destinations
      if(newDestinations.length === 0){
        alert("You need to set a floor to travel to ");
        return;
      }
      let smallerDest = []
      let greaterDest = []
      let sortedDest
      for(let destination of this.destinations){
        if(destination > this.origin){
          greaterDest.push(destination)
        } else{
          smallerDest.push(destination)
        }
      }
      greaterDest.sort()
      smallerDest.sort().reverse()
      if(this.direction === "up"){
        this.destinations = greaterDest.concat(smallerDest)
      }else{
        this.destinations = smallerDest.concat(greaterDest)
      }
      var setTarget = this.targetFloor
      var intervalClear = this.clearIn
      var currentLocation = this.origin
      var setOriginProp = this.setOV
      var floorsToTravel = 0
      var direction = ""

      if(this.destinations[0] > this.origin){
        floorsToTravel = this.destinations[0] - this.origin
        direction = "moveUp"
      }else{
        floorsToTravel = this.origin - this.destinations[0]
        direction = "moveDown"
      }
        this.interval =   setInterval(function(){
          if(direction === "moveUp"){
            currentLocation++
          }else{
            currentLocation--
          }
          floorsToTravel--
          setOriginProp(currentLocation)

          console.log(`Elevator A is On Floor ${currentLocation}`)
          if(floorsToTravel === 0 || newDestinations[0] === currentLocation){
            intervalClear()
            setTarget(currentLocation)
            console.log(`Reached storey ${currentLocation}, Elevator A Opens door`)
          }
         },1000)
         this.destinations.shift()
    },
    setOV(v){
      this.origin = v
    },
    clearIn(){
      clearInterval(this.interval)
    },
    emrExit(){
      this.clearIn()
      this.target = this.origin
      console.log(`Door are open`)

    },
    // setOrigin() takes two parameters starting floor and lift Direction this is invoked when the up/down button is clicked,
  setOrigin(starting_floor, liftDirection){
    if(this.origin === starting_floor){
      this.target = this.origin
      console.log("Select your floor")
      return
    }
    this.direction = liftDirection
    this.collectDestinations(starting_floor)
    if(!this.interval){
        this.movePassangers()
    }
    return
  },
  // for elev 2
  collectDestinations2(destination_floor){
    this.destinations2 = this.destinations2 === undefined ? []:this.destinations2
   if(this.destinations2.indexOf(destination_floor)===-1){
     this.destinations2.push(destination_floor)
   }
  },
  targetFloor2(d){
    this.target2 = d
  },
  movePassangers2(elvName){
    let newDestinations = this.destinations2
    if(newDestinations.length === 0){
      alert("You need to set a floor to travel to ");
      return;
    }
    let smallerDest = []
    let greaterDest = []
    let sortedDest
    for(let destination of this.destinations2){
      if(destination > this.origin2){
        greaterDest.push(destination)
      } else{
        smallerDest.push(destination)
      }
    }
    greaterDest.sort()
    smallerDest.sort().reverse()
    if(this.direction2 === "up"){
      this.destinations2 = greaterDest.concat(smallerDest)
    }else{
      this.destinations2 = smallerDest.concat(greaterDest)
    }
    var setTarget = this.targetFloor2
    var intervalClear = this.clearIn2
    var currentLocation = this.origin2
    var setOriginProp2 = this.setOV2
    var floorsToTravel = 0
    var direction = ""
    if(this.destinations2[0] > this.origin2){
      floorsToTravel = this.destinations2[0] - this.origin2
      direction = "moveUp"
    }else{
      floorsToTravel = this.origin2 - this.destinations2[0]
      direction = "moveDown"
    }
      this.interval2 =   setInterval(function(){
        if(direction === "moveUp"){
          currentLocation++
        }else{
          currentLocation--
        }
        floorsToTravel--
        setOriginProp2(currentLocation)

        console.log(`Elevator B On Floor ${currentLocation}`)
        if(floorsToTravel === 0 || newDestinations[0] === currentLocation){
          intervalClear()
          setTarget(currentLocation)
          console.log(`Reached storey ${currentLocation}, Elevator B Opens door`)
        }

       },1000)
       this.destinations2.shift()
  },
  setOV2(v){
    this.origin2 = v
  },
  clearIn2(){
    clearInterval(this.interval2)
  },
  emrExit2(){
    this.clearIn2()
    this.target2 = this.origin2
    console.log(`Door are open`)

  },
setOrigin2(starting_floor, liftDirection){
  if(this.origin2 === starting_floor){
    this.target2 = this.origin2
    console.log("Select your floor")
    return
  }
  this.direction2 = liftDirection
  this.collectDestinations2(starting_floor)
  if(!this.interval2){
      this.movePassangers2()
  }
  return
 }
  }
})
Vue.component('block1',{
  props:['number','current','target'],
  template:`
  <div>
    <div class="lift">
      <b>storey {{number}}</b></br>
      <table v-show="showNumberPlate">
      <tr>
        <td @click="movingFrom">9</td>
        <td @click="movingFrom"></td>
      </tr>
      <tr>
        <td @click="movingFrom">7</td>
        <td @click="movingFrom">8</td>
      </tr>
      <tr>
        <td @click="movingFrom">5</td>
        <td @click="movingFrom">6</td>
      </tr>
      <tr>
        <td @click="movingFrom">3</td>
        <td @click="movingFrom">4</td>
      </tr>
      <tr>
        <td @click="movingFrom">1</td>
        <td @click="movingFrom">2</td>
      </tr>
      <tr>
        <td @click="movingFrom">-1</td>
        <td @click="movingFrom">0</td>
      </tr>

      <tr>
        <td><button  @click="reset">reset</button></td>
      </tr>
      </table>
      <button v-show="showUpButton" @click.once="getFloor"
        >up</button></br>
      <button v-show="showDownButton" @click.once="getFloor"
        >down</button>
      <button  @click.once="emergency" >emergency</button>
    </div>
  </div>
  `,

  computed:{

      showNumberPlate(){
        return this.current === this.number && this.target===this.number
      },
      showUpButton(){
        return !this.showNumberPlate && this.number !== 9
      },
      showDownButton(){
          return !this.showNumberPlate && this.number !== -1
      }


  },

  methods:{
    movingFrom(e){
      this.$emit("setDest",e.target.innerText)
    },

    getFloor(e){
      this.$emit("setFloor",this.number,e.target.innerText)
    },
    emergency(e){
      this.$emit("exit")
    },
    reset(e){
      this.$emit("moveTo")
    }
  }
})

Vue.component('block2',{
  props:['number2','current2','target2'],
  template:`
  <div>
    <div class="lift">
      <b>storey {{number2}}</b></br>
      <table v-show="showNumberPlate">
      <tr>
        <td @click="movingFrom">9</td>
        <td @click="movingFrom"></td>
      </tr>
      <tr>
        <td @click="movingFrom">7</td>
        <td @click="movingFrom">8</td>
      </tr>
      <tr>
        <td @click="movingFrom">5</td>
        <td @click="movingFrom">6</td>
      </tr>
      <tr>
        <td @click="movingFrom">3</td>
        <td @click="movingFrom">4</td>
      </tr>
      <tr>
        <td @click="movingFrom">1</td>
        <td @click="movingFrom">2</td>
      </tr>
      <tr>
        <td @click="movingFrom">-1</td>
        <td @click="movingFrom">0</td>
      </tr>
      <tr>
        <td></td>
      </tr>
      <tr>
        <td><button  @click="reset">reset</button></td>
      </tr>
      </table>
      <button v-show="showUpButton" @click="getFloor"
      >up</button></br>

      <button v-show="showDownButton" @click="getFloor"
      >down</button>

      <button  @click="emergency">emergency</button>
    </div>
  </div>
  `,

  computed:{

      showNumberPlate(){
        return this.current2 === this.number2 && this.target2 === this.number2
      },
      showUpButton(){
        return !this.showNumberPlate && this.number2 !== 10
      },
      showDownButton(){
          return !this.showNumberPlate && this.number2 !== 0
      }


  },
  methods:{
    movingFrom(e){
      this.$emit("setDest2",e.target.innerText)
    },

    getFloor(e){
      this.$emit("setFloor2",this.number2,e.target.innerText)
    },
    emergency(e){
      this.$emit("exit2")
    },
    reset(e){
      this.$emit("moveTo2")
    }
  }
})
const elevator = new Vue({
  el: "#elevator",
})
