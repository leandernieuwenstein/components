export class BaseComponent  {
	/**
	 * @param {HTMLElement} root
	 * @constructor
	 */
	constructor( root ){
		this.root = root;

		this.state = {};
		this.props = {};
		this.children = {};
		this.isMounted = false;
	}

	/**
	 * This requests a draw
	 * It prevents unnecesary redraws when it's called multiple times in a row
	 */
	RequestDraw(){
		clearTimeout(this.drawRequest);
		this.drawRequest = setTimeout( () => {
			this.Draw();
		}, 10 );
	}

	/**
	 * Draws the component
	 */
	Draw(){}

	/**
	 * Mounts the component
	 */
	Mount(){
		this.isMounted = true;
		this.RequestDraw();
	}
}