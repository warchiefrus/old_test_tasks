export default class Contact  {
  constructor(payload) {
    this.id = payload? payload.id : ''
    this.name = payload? payload.name : ''
    this.company = payload? payload.company : ''
    this.email = payload? payload.email : ''
  }
}