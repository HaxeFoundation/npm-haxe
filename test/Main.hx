import pixi.core.graphics.Graphics;

class Main {

	static function main() {
		var graphic = new Graphics();
		graphic.beginFill(0xFF0000, 0.4);
		graphic.drawRect(200, 150, 400, 300);
		graphic.endFill();
	}
	
}
