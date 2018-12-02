import './dog.scss'

import React, { Component, Fragment } from 'react'
import axios from 'axios'

import Canvas from './canvas'

class Dog extends Component {
  constructor (props) {
    super(props)

    this.state = {
      listDogs: [],
      nameDog: '',
      dog: 'Beagle',
      urlImageDog: 'https://images.dog.ceo/breeds/beagle/n02088364_2652.jpg',
      font: 'Lobster',
      color: ''
    }

    this.getImageDog = this.getImageDog.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    const { dog } = this.state

    axios.get('https://dog.ceo/api/breeds/list/all')
      .then(res => {
        const { message } = res.data
        this.setState({ listDogs: Object.keys(message) })
      })
  }
  
  getImageDog (e) {
    const dog = e.target.value
    axios.get(`https://dog.ceo/api/breed/${e.target.value}/images/random`)
      .then(res => {
        this.setState({ 
          ...this.state,
          dog,
          urlImageDog: res.data.message
        })
    })
  }

  handleInput (e) {
    const { id, value }  = e.target
    this.setState({
      ...this.state,
      [id]: value
    })
  }

  handleChange (e) {
    const { value, id } = e.target

    switch (id) {
      case 'color':
        return this.setState({ ...this.state, color: value })
        break
      case 'font':
        return this.setState({ ...this.state, font: value })
        break
      default:
        return this.state
    }
  }

  render () {
    const { listDogs, nameDog, dog, urlImageDog } = this.state;

    return (
      <Fragment>
        <div className="col-lg-3">
          <div className="row">
            <div className="col-lg-12">
              <select onChange={this.getImageDog} defaultValue="selecione um cachorro">
                <option disabled>selecione um cachorro</option>
                { listDogs.map(dog => (
                  <option value={dog} key={dog}>{dog}</option>
                ))}
              </select>
            </div>
            <div className="col-lg-12">
              <label htmlFor="nameDog">Nome do Cachorro</label>
              <input
                type="text"
                id="nameDog"
                onChange={ this.handleInput }
                value={ this.nameDog }
                placeholder="entre com o nome do cachorro"
                />
            </div>
            <div className="col-lg-12">
              <p>Escolha uma fonte</p>
              <select defaultValue="selecione" onChange={ this.handleChange } id="font"> 
                <option value="selecione" disabled>Selecione uma Fonte</option>
                <option value="Lobster">Lobster</option>
                <option value="Pacifico">Pacifico</option>
                <option value="Caveat">Caveat</option>
                <option value="Ranga">Ranga</option>
                <option value="Satisfy">Satisfy</option>
              </select>
            </div>
            <div className="col-lg-12">
              <p>Escolha uma cor</p>
              <select defaultValue="selecione" onChange={ this.handleChange } id="color">
                <option value="selecione" disabled>Selecione uma Cor</option>
                <option value="red">Vermelho</option>
                <option value="green">Verde</option>
                <option value="orange">Laranja</option>
                <option value="gray">Cinza</option>
                <option value="blue">Azul</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-lg-offset-3">
          <h1>Raça: { dog }</h1>
          <h2>
            Nome do Animal: &nbsp;
            <span style={{ color: this.state.color, fontFamily: this.state.font }}>
              { (nameDog || dog) }
            </span>
          </h2>
          <Canvas
            urlImage={ urlImageDog }
            nameDog= { (nameDog || dog ) }
            font={ this.state.font }
          />
        </div>
      </Fragment>
    )
  }
}

export default Dog
