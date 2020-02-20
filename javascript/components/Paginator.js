import { BaseComponent } from './BaseComponent.js';

/**
 * Attributes:
 *  data-page-count
 *  data-current-page
 */
export class PaginatorComponent extends BaseComponent  {
	/**
	 * @param {HTMLElement} root
	 * @constructor
	 */
	constructor( root ) {
		super( root );

		this.props = {
			pageCount: 0,
			currentPage: 0
		};

		// Bindable events
		this.OnNext = () => {};
		this.OnPrevious = () => {};
		this.OnPageClick = ( pageIndex ) => {};
	}

	/**
	 * Sets the page count
	 * @param {int} pageCount
	 */
	SetPageCount( pageCount ){
		this.props.pageCount = pageCount;
		this.RequestDraw();
	}

	/**
	 * Sets the current page
	 * @param {int} pageIndex
	 */
	SetCurrentPage( pageIndex ){
		this.props.currentPage = pageIndex;
		this.RequestDraw();
	}

	/**
	 * Draws the component
	 */
	Draw(){
		let prevBtn = `<button class="previous">&lt;</button>`;
		let nextBtn = `<button class="next">&gt;</button>`;
		if( this.props.currentPage === 0 )
			prevBtn = `<button class="previous" disabled>&lt;</button>`;
		if( this.props.currentPage >= this.props.pageCount - 1 )
			nextBtn = `<button class="next" disabled>&gt;</button>`;

		let pageBtns = '';
		for( let i = 0; i < this.props.pageCount; i++ ){
			let displayPageNr = i + 1;
			let selected = '';
			if( i === this.props.currentPage )
				selected = ' selected';

			pageBtns += `<button class="page-btn` + selected + `">` + displayPageNr + `</button>`;
		}

		this.root.innerHTML = prevBtn + pageBtns + nextBtn;

		this.BindEvents();
	}

	/**
	 * Binds the events of this component
	 */
	BindEvents(){
		this.root.querySelector( '.next' ).addEventListener('click', () => {
			this.OnNext();
		} );

		this.root.querySelector( '.previous' ).addEventListener('click', () => {
			this.OnPrevious();
		} );

		this.root.querySelectorAll( '.page-btn' ).forEach( ( btn, index ) => {
			btn.addEventListener('click', () => {
				this.OnPageClick( index );
			} );
		} );
	}
}