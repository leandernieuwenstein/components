export class Paginator extends HTMLElement  {
	constructor(){
		super();

		// Bindable events
		this.OnNext = () => {};
		this.OnPrevious = () => {};
		this.OnPageClick = ( pageIndex ) => {};

		this.Draw();
	}

	Draw(){
		let prevBtn = `<button class="previous">&lt;</button>`;
		let nextBtn = `<button class="next">&gt;</button>`;
		if( this.dataset.currentPage == 0 )
			prevBtn = `<button class="previous" disabled>&lt;</button>`;
		if( this.dataset.currentPage >= this.dataset.amoutOfPages - 1 )
			nextBtn = `<button class="next" disabled>&gt;</button>`;

		let pageBtns = '';
		for( let i = 0; i < this.dataset.amoutOfPages; i++ ){
			let displayPageNr = i + 1;
			let selected = '';
			if( i == this.dataset.currentPage )
				selected = ' selected';

			pageBtns += `<button class="page-btn` + selected + `">` + displayPageNr + `</button>`;
		}

		this.innerHTML = prevBtn + pageBtns + nextBtn;

		this.BindEvents();
	}

	BindEvents(){
		this.querySelector( '.next' ).addEventListener('click', () => {
			this.OnNext();
		} );

		this.querySelector( '.previous' ).addEventListener('click', () => {
			this.OnPrevious();
		} );

		this.querySelectorAll( '.page-btn' ).forEach( ( btn, index ) => {
			btn.addEventListener('click', () => {
				this.OnPageClick( index );
			} );
		} );
	}
}

customElements.define( 'my-paginator', Paginator );