import { BaseComponent } from './BaseComponent.js';
import { Page } from '../dataObjects/Page.js';

export class SideMenu extends BaseComponent  {
	/**
	 * @constructor
	 */
	constructor() {
		super();
		this.props = {
			pages: [],
			currentPageIndex: 0
		};

		// Bindable event
		this.OnSelectedLinkChange = ( url ) => {};
	}

	/**
	 * @param {Page[]} pages
	 */
	SetPages( pages ){
		this.props.pages = pages;
		this.RequestDraw();
	}

	SetCurrentPage( index ){
		this.props.currentPageIndex = index;
		this.RequestDraw();
	}

	/**
	 * Draws the component
	 * @override
	 */
	Draw(){
		let content = '';
		for( let i = 0; i < this.props.pages.length; i++ ){
			let selected = '';
			if( i == this.props.currentPageIndex )
				selected = " class='selected'";

			content += `<a data-target="` + i + `"` + selected + `>` + this.props.pages[i].linkText + `</a>`;
		}

		this.innerHTML = content;

		this.BindEvents();
	}

	/**
	 * Binds the events
	 */
	BindEvents(){
		for( let link of this.children ){
			link.onclick = ( e ) => {
				this.OnSelectedLinkChange( e.currentTarget.dataset.target );
			};
		}
	}
}

customElements.define( 'my-side-menu', SideMenu );