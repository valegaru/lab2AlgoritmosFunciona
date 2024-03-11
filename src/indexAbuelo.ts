import { workers } from './data/data';
import './components/indexPadre';
import MyTrabajador, { Attribute } from './components/trabajador/trabajador';

class AppContainer extends HTMLElement {
	trabajadores: MyTrabajador[] = []; //creo un arreglo de trabajadores porque a data tiene varios trabajadores y voy a renderizar de mis componentes Trabajador

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });

		const filteredWorkers = workers.filter((user) => user.id % 2 === 0);

		this.trabajadores = filteredWorkers.map((user) => {
			const trabajadorCard = this.ownerDocument.createElement('my-trabajador') as MyTrabajador;
			trabajadorCard.setAttribute(Attribute.image, user.image);
			trabajadorCard.setAttribute(Attribute.name, user.name);
			trabajadorCard.setAttribute(Attribute.uid, String(user.id));
			trabajadorCard.setAttribute(Attribute.age, String(user.age));
			trabajadorCard.setAttribute(Attribute.gender, user.gender);
			trabajadorCard.setAttribute(Attribute.area, user.jobDetails.area);
			trabajadorCard.setAttribute(Attribute.position, user.jobDetails.position);
			trabajadorCard.setAttribute(Attribute.timeInCompany, String(user.jobDetails.timeInCompany));
			trabajadorCard.setAttribute(Attribute.experience, String(user.jobDetails.experience));
			return trabajadorCard;
		});
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.trabajadores.forEach((trabajador) => {
				this.shadowRoot?.appendChild(trabajador);
			});
		}
	}
}

customElements.define('app-container', AppContainer);
