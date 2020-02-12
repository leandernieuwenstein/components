export class BaseComponent extends HTMLElement  {
	/**
	 * @constructor
	 */
	constructor(){
		super();
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
}