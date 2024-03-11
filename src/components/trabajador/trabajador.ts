export enum Attribute { //enum es algo de ts, permiten definir un conjunto de constantes con nombres
	'image' = 'image',
	'name' = 'name',
	'uid' = 'uid',
	'age' = 'age',
	'gender' = 'gender',
	'area' = 'area',
	'position' = 'position',
	'timeincompany' = 'timeincompany',
	'experience' = 'experience',
}

class Trabajador extends HTMLElement {
	uid?: number; //cuando se pone id hay que cambiarla y ponerle como uid
	name?: string; // hay que agregar ? para que espere a info dinamica
	image?: string; //los dos puntos despues de cada propiedad y o que viene es para definirlas
	age?: number;
	gender?: string;
	area?: string;
	position?: string;
	timeincompany?: number; // years
	experience?: number; // years

	//igual que en js
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	//diferente a js
	static get observedAttributes() {
		const attrs: Record<Attribute, null> = {
			image: null,
			name: null,
			uid: null,
			age: null,
			gender: null,
			area: null,
			position: null,
			timeincompany: null,
			experience: null,
		};
		return Object.keys(attrs); // return ['image','name', 'uid', ....]; (es otra forma m[as simple de hacerlo pero a que esta contando es mas rigurosa])
	}

	//diferente a js
	attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
		// esta rayita | significa "o", string o undefined
		switch (propName) {
			case Attribute.uid:
				this.uid = newValue ? Number(newValue) : undefined; // switch hay que hacerlo cada vez que la propiedad sea de tipo number
				break;

			case Attribute.age:
				this.age = newValue ? Number(newValue) : undefined; // ? es sino. si existe un nuevo valor que se convierta en NewValue pero si no lo hay, dejar NewValue undefined
				break;

			case Attribute.timeincompany:
				this.timeincompany = newValue ? Number(newValue) : undefined;
				break;

			case Attribute.experience:
				this.experience = newValue ? Number(newValue) : undefined;
				break;

			default:
				this[propName] = newValue; //siempre hay que dejar esta linea
				break;
		}
		this.render();
	}

	//igual que en js
	connectedCallback() {
		this.render();
	}

	//diferente a js
	render() {
		if (this.shadowRoot) {
			//si el shadowroot existe entonces se va a hacer lo siguiente
			this.shadowRoot.innerHTML = `
      <section>
        <img src="${this.image}"><img>
        <h1><b>Name:</b> ${this.name}</h1>
        <p><b>Id:</b> ${this.uid}</p>
        <p><b>Age:</b> ${this.age} years old</p>
        <p><b>Gender:</b> ${this.gender}</p>
        <h3><b>Area:</b> ${this.area}</h3>
        <h3><b>Position:</b> ${this.position}</h3>
        <p><b>Time in this company:</b> ${this.timeincompany} years</p>
        <p><b>Experience:</b> ${this.experience} years</p>
        </section>
        `;
		}
	}
}

export default Trabajador;
customElements.define('my-trabajador', Trabajador);
