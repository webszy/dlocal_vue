<template>
   <div class="dlocal w-full h-full absolute flex-center" :class="countryCode==='IN'?'pt20':''">
    <section id="fields-form-example-1" class="formCard animated fast slideInDown flex-none" :class="countryCode">
      <div class="fieldset relative">
        <button @click="$emit('close')" class="close block absolute bg-no-repeat bg-center"></button>
        <legend class="example-1-title">{{title}}</legend>
        <fieldset>
          <div class="fieldItem flex flex-col pointer one required">
            <label for="customer-name">NAME</label>
            <input
              id="customer-name"
              class="input"
              type="text"
              required
              @focus="handleInput"
              @blur="handleBlur"
              v-model.trim="name"
            />
          </div>
           <div class="fieldItem flex flex-col pointer one required">
            <label for="customer-email">E-Mail</label>
            <input
              id="customer-email"
              class="input"
              type="text"
              placeholder="xxx@xxx.com"
              required
              @focus="handleInput"
              @blur="handleBlur"
              v-model.trim="email"
            />
          </div>
          <div class="fieldItem flex flex-col pointer one required">
            <label for="customer-id">{{IDTEXT}}</label>
            <input
              id="customer-id"
              class="input"
              type="text"
              :placeholder="`please input your ${IDTEXT}`"
              required
             @focus="handleInput"
              @blur="handleBlur"
              v-model.trim="id"
            />
          </div>
          <div class="fieldItem flex flex-col pointer one required"  v-show="showAddressInfo">
            <label for="customer-city">City</label>
            <input
              id="customer-city"
              class="input"
              type="text"
              placeholder="Your city is required"
              required
              @focus="handleInput"
              @blur="handleBlur"
              v-model.trim="city"
            />
          </div>
          <div class="fieldItem flex flex-col pointer one required" v-if="showAddressInfo">
            <label for="customer-street">Street</label>
            <input
              id="customer-street"
              class="input"
              type="text"
              placeholder="Your street is required"
              required
              @focus="handleInput"
              @blur="handleBlur"
              v-model="street"
            />
          </div>
          <div class="fieldItem flex flex-col pointer one required" v-if="showAddressInfo">
            <label for="customer-number">House Number</label>
            <input
              id="customer-number"
              class="input"
              type="text"
              placeholder="Your House Number is required"
              required
              @focus="handleInput"
              @blur="handleBlur"
              v-model="housenumber"
            />
          </div>
          <div class="fieldItem flex flex-col pointer" v-if="paymentType === 'TICKET'">
            <label for="example-1-pan">TICKET NAME</label>
            <button class="brand" @click="openPicker">{{brandBtnText}}</button>
          </div>
           <div class="fieldItem flex flex-col pointer" v-if="paymentType === 'BANK_TRANSFER'">
            <label for="example-1-pan">BANK NAME</label>
            <button class="brand" @click="showPicker=!showPicker">{{brandBtnText}}</button>
          </div>
          <div class="fieldItem flex flex-col pointer required"  v-if="showCardInput" @click="callInput('card')">
            <label for="example-1-pan">CARD NUMBER</label>
            <div id="pay-card" class="pay-element" ></div>
          </div>
          <div class="lastRow flex justify-between" v-if="showCardInput" @click="callInput('cvv')">
            <div class="fieldItem flex flex-col pointer half">
              <label for="example-1-expiration">EXPIRATION</label>
              <div id="pay-expiration" @click="callInput('expiration')" class="pay-element "></div>
            </div>
            <div class="fieldItem flex flex-col pointer half" @click="callInput('cvv')">
              <label for="example-1-cvv">CVV</label>
              <div id="pay-cvv" class="pay-element"></div>
            </div>
          </div>
          <!-- <div class="field select-wrapper">
            <label for="example-1-installments">INSTALLMENTS</label>
            <span>▼</span>
            <select
              for="example-1-installments"
              class="installments"
              disabled
            >
              <option value="">-</option>
            </select>
          </div> -->
        </fieldset>
        <button
          id="example-1.form.pay_button"
          class="payBtn flex-center w-full fff"
          @click="beforePay($event)"
        >
          Pay
        </button>
      </div>

    </section>
    <van-popup
     v-model="showPicker"
     position="bottom"
     get-container="body"
     :overlay="false"
    >
      <van-picker
        show-toolbar
        :allow-html="true"
        :columns="columns"
        item-height="0.5rem"
        swipe-duration="500"
        confirm-button-text="confirm"
        cancel-button-text="cancel"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
// import to from 'await-to-js'
import cardInfo from './assets/DLOCALLimition'
import localCurrencyCode from './assets/localCurrency'
// import {getUserIp} from '@/utils/request'
import { validate as validateCNPJ } from 'cnpj'
import { isValid as validateCPF } from '@fnando/cpf'
import {Popup,Picker} from 'vant'

export default {
  name: 'PayBydlocal',
  inheritAttrs:true,
  components:{
    VanPopup:Popup,
    VanPicker:Picker
  },
  data() {
    return {
      dlocalInstance:null,
      cardElement:null,
      expElement:null,
      cvvElement:null,
      name:'',
      email:'',
      id:'',
      city:'',
      street:'',
      housenumber:'',
      columns: [],
      selectMap:[],
      showPicker:false,
      selected:{},
      brandValue:'',
      popupInited:false,
      env:'development',
      ip:'',
      numberCompleted:true,
      expCompleted:false,
      cvvCompleted:false,
      paymentType:'',
      blurTimer:''
    }
  },
  props:{
    payInfo:{
      type:Object,
      required:true
    },
    number:{
      type:String,
      required:true
    },
    radio:{
      type:String,
      required:true
    }
  },
  computed: {
    brandBtnText(){
      if(Object.keys(this.selected).length === 0){
        if(this.paymentType === 'BANK_TRANSFER'){
          return 'please select Bank'
        }
        return 'please select ticket provider'
      } else {
        return this.selected.label
      }
    },
    showAddressInfo(){
      if(this.countryCode==='IN'){
        return true
      }
      return false
    },
    IDTEXT(){
      const idTextList = {
        AR:'DNI or CUIT',
        BR:'CPF or CNPJ',
        CL:'CI or RUT',
        CO:'CC',
        EC:'CI',
        EG:'ID',
        IN:'PAN',
        ID:'NIK',
        MX:'CURP',
        MA:'CNIE',
        NG:'NIN',
        PY:'CI',
        PE:'DNI',
        ZA:'ID',
        TR:'T.C. Kimlik No.',
        UY:'CI'
      }
      return idTextList[this.countryCode] || 'Your ID'
    },
    paymentFlow(){
      if(
        this.countryCode==='ID' ||
        ['BANK_TRANSFER','TICKET'].includes(this.paymentType)
      ){
        return 'REDIRECT'
      }
      return 'DIRECT'
    },
    showCardInput(){
      if(this.paymentFlow === 'REDIRECT'){
        return false
       }
       return true
    },
    title(){
      if(this.paymentType === 'BANK_TRANSFER'){
        return 'Bank Transfer'
      } else if(this.paymentType === 'TICKET'){
        return 'Pay By Ticket'
      } else {
        return 'Payment'
      }
    },
    countryCode(){
      return this.$store.getters.device.countryCode
    }
  },
  created() {
  },
  mounted() {
    if(process.env.NODE_ENV==='development') {
      this.env = 'sandbox'
      this.name = 'Dlocal Testes'
      this.email = 'jzheng@dlocal.com'
      this.id = '07206745903'// 52894930500
    }
    setTimeout(()=>{
      this.initPayment()
    },700)
  },
  methods: {
    async initPayment(){
      this.$loading('')
      // 判断payment类型
      if(this.radio === 'dlocal_card'){
        this.paymentType = 'CARD'
      } else if(this.radio === 'dlocal_transfer'){
        this.paymentType = 'BANK_TRANSFER'
      } else if(this.radio === 'dlocal_cash'){
        this.paymentType = 'TICKET'
      }
      if(!this.showCardInput){
        await this.initPopUp()
        this.$loading.close()
        return
      }
      const apiKey = this.env === 'production' ? '9d4ba3a8-7d60-4d16-8a80-063a7586340d' : '9c7ba12a-64ec-4ede-8ffa-588d3adac8f8'
      const dlocalInstance = window.dlocal(apiKey)
      const fields = dlocalInstance.fields({
        // fonts: [
          // {
          //   cssSrc: "https://rsms.me/inter/inter-ui.css",
          // },
        // ],
        locale: 'en',
        country: this.countryCode
      })
      const style = {
          base: {
            fontSize: '16px',
            fontFamily: 'Avenir',
            lineHeight: '30px',
            fontSmoothing: 'antialiased',
            fontWeight: '600',
            color: 'rgba(0,0,0,0.5)',
            '::placeholder': {
              color: 'rgba(0,0,0,0.5)'
            },
            iconColor: '#787878'
          },
          autofilled: {
            color: '#000000'
          },
        }
      const card = fields.create('pan', {
        style,
        placeholder: '4111 1111 1111 1111'
      })
      const expiration = fields.create('expiration', {
        style,
        placeholder:'MM/YY',
      });
      const cvv = fields.create('cvv', {
        style,
        placeholder: '123'
      })
      card.mount(document.getElementById('pay-card'))
      card.on('change', e => {
        console.log('initPayment -> e', e)
        // this.numberCompleted = e.complete
        if(e.error&&e.error.message){
          this.$emit('toast',{msg:e.error.message})
        }
      })
      card.on('focus',e=>{
        this.handleInput()
      })
      card.on('blur',e=>{
        console.log('emit card blur')
        this.handleBlur()
      })
      expiration.mount(document.getElementById('pay-expiration'))
      expiration.on('change', e => {
        this.expCompleted = e.complete
        if(e.error&&e.error.message){
           this.$emit('toast',{msg:e.error.message})
        }
      })
      expiration.on('focus',e=>{
        this.handleInput()
      })
      expiration.on('blur',e=>{
        console.log('emit expiration blur')
        this.handleBlur()
      })
      cvv.mount(document.getElementById('pay-cvv'))
      cvv.on('change', e => {
        this.cvvCompleted = e.complete
        if(e.error&&e.error.message){
           this.$emit('toast',{msg:e.error.message})
        }
      })
      cvv.on('focus',e=>{
        this.handleInput()
      })
      cvv.on('blur',e=>{
        console.log('emit cvv blur')
        this.handleBlur()
      })
      cvv.on('ready',() => {
        // getUserIp()
        // .then(res=>{
          // this.ip=res.ip
          this.$loading.close()
        // })
        // .catch(err=>{
          // this.$clearLoading()
          // console.log('initPayment -> err', err)
        // })

      })
      // this.initPopUp()
      this.cardElement = card
      this.expElement = expiration
      this.cvvElement = cvv
      this.dlocalInstance = dlocalInstance
      await this.initPopUp()
    },
    beforePay(e){
      e.preventDefault()
       if(this.name===''){
        this.$emit('toast',{msg:'please input your name'})
        return
      }
      if(this.email==='' || !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ig.test(this.email)){
        this.$emit('toast',{msg:'please input correct email'})
        return
      }
      if(this.id==='' || this.id.length<5){
        this.$emit('toast',{msg:`please input your ${this.IDTEXT}`})
        return
      } else {
        if(!this.checkDocumentId(this.id,this.countryCode)){
          this.$emit('toast',{msg:`please input the correct  ${this.IDTEXT} number`})
          return
        }
      }
      if(this.countryCode==='IN'&&(this.city === ''||this.street === ''||this.housenumber === '')){
        this.$emit('toast',{msg:'please input your address information'})
        return
      }
      if(['BANK_TRANSFER','TICKET'].includes(this.paymentType) && Object.keys(this.selected).length ===0){
        const msg = this.paymentType === 'BANK_TRANSFER'?'please select the bank':'please select ticket provider'
        this.$emit('toast',{msg})
        return
      }
      if(this.showCardInput&&!this.numberCompleted){
        this.$emit('toast',{msg:'please complete your card information'})
        return
      }
      if(this.showCardInput&&!this.expCompleted){
        this.$emit('toast',{msg:'please complete your card expiration'})
        return
      }
      if(this.showCardInput&&!this.cvvCompleted){
        this.$emit('toast',{msg:'please complete your CVV'})
        return
      }
      if(this.paymentFlow === 'REDIRECT'){
         const Obj = {
            payer:{
              name: this.name,
              email: this.email,
              document: this.id,
              // ip:this.ip,
              // device_id:this.payInfo.clientId,
              address:{
                city:this.city,
                street:this.street,
                number:this.housenumber,
                // state:'',
                // zip_code:''
              }
            },
            country:this.countryCode,
            currency:localCurrencyCode[this.countryCode],
            payment_method_id:this.paymentType !=='CARD'?this.selected.value:'CARD',
            payment_method_flow: this.paymentFlow,
            amount: this.payInfo.priceNum, // 金额的单价，float型，非string
            order_id:this.number,
            notification_url:'http://xxx'
        }
        console.log('beforePay -> REDIRECT', Obj)
        this.$emit('payOutSide',Obj)
      } else {
        this.getToken()
      }
    },
    getToken(){
      this.$dialog.confirm({
        title: 'Details Confirm',
        message: 'I\'m sure all the payment details are correct.',
        confirmButtonText:'Continue',
        cancelButtonText:'Cancel',
        beforeClose:(action, done) =>{
          if (action === 'confirm') {
            this.dlocalInstance.createToken(this.cardElement,{name:this.name})
              .then(res=>{
                console.log('getToken -> res', res)
                const putObj = {
                  card: res,
                  payer:{
                    name: this.name,
                    email: this.email,
                    document: this.id,
                    // ip:this.ip,
                    // device_id:this.payInfo.clientId,
                    address:{
                      city:this.city,
                      street:this.street,
                      number:this.housenumber
                      // state:'',
                      // zip_code:''
                    }
                  },
                  currency:localCurrencyCode[this.countryCode],
                  payment_method_id:this.paymentType !=='CARD'?this.selected.value:'CARD',
                  payment_method_flow: 'DIRECT',
                  notification_url:'xxx'
                }
                console.log('getToken -> DIRECT', putObj)
                done()
                this.$emit('updateOrder',putObj)
                this.name=''
                this.email=''
                this.id=''
                this.city=''
                this.street=''
                this.housenumber=''
                this.$emit('close')
              })
              .catch(err=>{
                console.warn('getToken -> err', err)
                done()
                this.$emit('toast',{msg:err.error.message,duration:6*1000})
              })
          } else {
            done();
          }
        }
      })
      .then(()=>{})
      .catch(()=>{})
    },
    onConfirm(value, index) {
      // console.log('onConfirm -> value', value)
      this.selected = this.selectMap[index]
      this.showPicker = false
    },
    async initPopUp(){
      const info = cardInfo.find(e=>e.countryCode === this.countryCode)
      if(info){
        let cardInfoList = []
        if(this.paymentType === 'CARD'){
          cardInfoList = info.cardBrands
        } else if(this.paymentType === 'BANK_TRANSFER'){
          cardInfoList=info.bankTransferList
        } else {
          cardInfoList=info.tickets
        }

        const loadBrandImg = function(url,label){
          return new Promise((resolve,reject)=>{
            const img = new Image()
            img.src = url
            img.onload = function(){
              resolve&&resolve(`<img class="brandLogo" src="${url}"/>`)
            }
            img.onerror = function(){
              resolve&&resolve(label)
            }
          })
        }
        for(const  e of cardInfoList){
          const imgURL = `https://pay.dlocal.com/views/2.0/images/payments/${e.value}.png`
          const end = await loadBrandImg(imgURL,e.label)
          this.columns.push(end)
        }
        console.log('initPopUp over')
        this.selectMap = cardInfoList
        this.popupInited = true
      }

    },
    checkDocumentId(id,countryCode){
      // https://dlocal.gitbook.io/dlocal-china/api-dui-jie-wen-dang/payins-api-wen-dang/guo-jia-xin-xi
      let arr = id.split('')
      const regList = {
        AR: ()=>/\d{7,11}/.test(id) && [7,8,9,11].includes(arr.length), // /(?<!\d)(\d{7,9}|\d{11})(?!\d)/.test(id),
        BR: ()=>{
          // /\d{11,14}/.test(id) && arr.length<=14
          // 如果存在字母就是错的
          if(/[a-zA-Z]/g.test(id)){
            return false
          }
          arr = arr.map(e=>parseInt(e))
          const len = arr.length
          // if(this.env === 'sandbox'){
          //   return true
          // }
          const invalid_cpfs = [
            '00000000000',
            '11111111111',
            '22222222222',
            '33333333333',
            '44444444444',
            '55555555555',
            '66666666666',
            '77777777777',
            '88888888888',
            '99999999999',
            '00000000000000',
            '11111111111111',
            '22222222222222',
            '33333333333333',
            '44444444444444',
            '55555555555555',
            '66666666666666',
            '77777777777777',
            '88888888888888',
            '99999999999999'
          ]
          if(invalid_cpfs.includes(id)){
            return false
          }
          if(len === 11){
            //cpfs
            // for (let t = 9; t < 11; t++) {
            //   let d = 0
            //   let c = 0
            //   for (c < t; c++;) {
            //     d = d+arr[c] * ((t + 1) - c)
            //   }
            //   d = ((10 * d) % 11) % 10;
            //   if (arr[c] != d) {
            //     return false
            //   }
            // }
            // return true
            // 算法2 也可由使用
            // let sum = 0
            // const value = id+''
            // const firstCN = parseInt(value.substring(9, 10), 10)
            // const secondCN = parseInt(value.substring(10, 11), 10)
            // const checkResult = function(sum, cn) {
            //   let result = (sum * 10) % 11
            //   if ((result === 10) || (result === 11)) {result = 0}
            //   return (result === cn)
            // }
            // for (let i = 1; i <= 9; i++ ) {
            //   sum = sum + parseInt(value.substring(i - 1, i), 10) * (11 - i);
            // }
            // if (checkResult(sum, firstCN) ) {
            //   sum = 0
            //   for (let i = 1; i <= 10; i++ ) {
            //     sum = sum + parseInt(value.substring(i - 1, i), 10) * (12 - i)
            //   }
            //   return checkResult(sum, secondCN)
            // }
            // return false
            return validateCPF(id)
          } else if(len === 14) {
            //cnpj
            // const b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
            // const cnpj = arr
            // let n = 0
            // for (let i = 0; i < 12;){
            //   n = n + cnpj[i] * b[++i]
            // }
            // if (cnpj[12] != (((n %= 11) < 2) ? 0 : 11 - n)){
            //   return false
            // }
            //  for (let i = 0; i < 12;){
            //   n = n + cnpj[i] * b[++i]
            // }
            // if (cnpj[13] != (((n %= 11) < 2) ? 0 : 11 - n)){
            //   return false
            // }
            // return true
            return validateCNPJ(id)
          } else {
            return false
          }
        },
        CL: ()=>/\d{8,9}/.test(id) && arr.length<=9,
        CO: ()=>/\d{6,10}/.test(id) && arr.length<=10,
        EC: ()=>/\d{5,20}/.test(id) && arr.length<=20,
        EG: ()=>/\d{14}/.test(id) && arr.length===14,
        IN: ()=>{
          const len = arr.length
          if (len > 10) { return false }
          for(let i = 0;i<len;i++){
            if(!/[A-Z]/.test(arr[i])&&i<5){
              return false
            }
            if(!/\d/.test(arr[i])&&i>=5&&i<=8){
              return false
            }
            if(!/[A-Z]/.test(arr[i])&&!/\d/.test(arr[i])&&i===9){
              return false
            }
          }
          return true
        },
        ID: ()=>/\d{16}/.test(id) && arr.length===16,
        MX: ()=>/\s{10,18}/.test(id) && arr.length>=10 && arr.length<=18,
        MA: ()=>/\s{5,20}/.test(id) && arr.length>=5 && arr.length<=20,
        NG: ()=>/\d{11}/.test(id) && arr.length===11,
        PY: ()=>/\d{5,20}/.test(id) && arr.length>=5 && arr.length<=20,
        PE: ()=>/\d{5,8}/.test(id) && arr.length>=5 && arr.length<=8,
        ZA: ()=>/\d{5,20}/.test(id) && arr.length>=5 && arr.length<=20,
        TR: ()=>/\d{5,20}/.test(id) && arr.length>=5 && arr.length<=20,
        UY: ()=>/\d{6,8}/.test(id) && arr.length>=6 && arr.length<=8,
      }
      return regList[countryCode]()
    },
    callInput(name){
      if(name === 'card'){
        console.log('callInput -> name', name)
        this.cardElement.focus()
      } else if(name === 'expiration'){
        console.log('callInput -> name', name)
        this.expElement.focus()
      } else {
        console.log('callInput -> name', name)
        this.cvvElement.focus()
      }
    },
    handleBlur(){
        this.blurTimer = setTimeout(()=>{
           window.scrollTo(0, 0)
        },100)
    },
    handleInput(){
        clearTimeout(this.blurTimer)
    },
    openPicker(){
      const system = this.$store.getters.device.platform.toLowerCase()
      this.showPicker=!this.showPicker
      window.scrollTo(0, 0)
    }
  }
}
</script>
<style scope>
.dlocal{
  left:0;
  top:0;
  background-color: rgba(0, 0, 0, .7);
}
.dlocal section{
  overflow: unset;
}
.pt20{
  box-sizing: border-box;
  padding-top: .2rem;
}
.dlocal .IN{
  overflow-x: scroll;
  height: 100%;
  -webkit-overflow-scrolling:touch;
}
.dlocal .IN legend{
  margin-bottom: 0;
}
.close{
  display: block;
  width: .25rem;
  height: .25rem;
  background-image: url('../../assets/images/dlocal_close.png');
  /* background-size: .17rem .17rem; */
  position: absolute;
  top:.1rem;
  right: .1rem;
}
.formCard{
  /* width: 88.88%; 86.3*/
  width: 91.65%;
  background-color: #fff;
  box-shadow: 0 .07rem .14rem rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  border-radius: .06rem;
}
.fieldset{
  padding: .16rem;
}
.fieldset legend{
  font-family: 'Avenir';
  font-size: .2rem;
  margin-bottom:.2rem;
  color: #000;
  font-weight: 700;
  text-align: center;
}
.fieldset fieldset{
  border: none;
}
.fieldset .fieldItem{
  /* border-bottom: 0.0625em solid #a2a2a2; */
  /* border-radius: unset; */
  padding: .06rem;
}

.fieldset .fieldItem label{
  color:rgba(0,0,0,0.5);;
  font-family: 'Avenir';
  font-weight: 600;
  font-size: .16rem;
  margin-bottom: .06rem;
}
.fieldset .fieldItem label::after{
  content: '*';
  color: #FF2727;
  font-size: .16rem;
  margin-left: .03rem;
  font-family: 'Avenir';
  font-weight: 600;
}
.fieldset .one input{
  /* width: 100%; */
  height: .3rem;
  color: rgba(0,0,0,0.5);
  font-family: 'Avenir';
  font-weight: 600;
  background: #F1F1F1;
  padding: .05rem 0 .06rem 0;
  border-bottom: 1px solid #fff;
  transition: border-color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  font-size: .16rem;
  border-radius: .06rem;
  padding-left: .08rem;
}
.fieldset .one input::placeholder{
  color: rgba(0,0,0,0.5);
  font-size:.16rem;
  font-family: 'Avenir';
  font-weight: 600;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing:antialiased;
}
.fieldset .one input::-webkit-input-placeholder {
  color: rgba(0,0,0,0.5);;
  font-size:.16rem;
  font-family: 'Avenir';
  font-weight: 600;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing:antialiased;
}
.fieldset .one input::-moz-placeholder {
  color: rgba(0,0,0,0.5);;
  font-size:.16rem;
  font-family: 'Avenir';
  font-weight: 600;
  opacity: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing:antialiased;
}
.fieldset .one input::-ms-input-placeholder {
  color: rgba(0,0,0,0.5) !important;
  font-size:.16rem;
  font-family: 'Avenir';
  font-weight: 600;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing:antialiased;
}   /* IE10+ */

.pay-element{
  padding: .05rem 0;
  background-color: #F1F1F1;
  box-sizing: border-box;
  padding-left: .08rem;
  border-radius: .06rem;
}
.fieldset .lastRow{

}
.fieldset .half{
  width: 45%;
}
.fieldset .payBtn{
  height: .4rem;
  margin: .3rem 0 0;
  background-color: rgb(255, 46, 80);
  border-radius: .06rem;
  font-size: .16rem;
}
.dlocal .van-picker{
  position: absolute;
  left:0;
  bottom: 0;
}
.dlocal .brand{
  /* padding: .05rem 0 .06rem 0; */
  height: .42rem;
  text-align: left;
  text-indent: .04rem;
  border-radius: .06rem;
  font-size: .16rem;
  font-weight: 600;
  color: rgba(0,0,0,0.5);
  background: #F1F1F1;
  text-indent: .09rem;
}
.dlocal .pay-element .DlocalField div div{
  display: flex;
}

</style>
<style >
  html body .van-picker .van-ellipsis {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
html body .van-picker .van-ellipsis .brandLogo {
   height: 90%;
   margin: 0 auto;
}
</style>
