export class SideMenu extends HTMLElement  {
	constructor() {
		super();

		// Bindable event
		this.OnSelectedLinkChange = () => {};

		this.Init();
	}

	Init(){
		for( let child of this.children ){
			if( child.dataset.target === this.dataset.selectedLink )
				child.classList.add( 'selected' );
		}

		this.BindEvents();
	}

	BindEvents(){
		for( let link of this.children ){
			link.onclick = ( e ) => {
				this.OnSelectedLinkChange( e.currentTarget.dataset.target );
			};
		}
	}
}

customElements.define( 'my-side-menu', SideMenu );