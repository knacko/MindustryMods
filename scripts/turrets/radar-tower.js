const fc = require("libs/fc")
const SoundH = require("SoundH")
const despaw = new Effect(20, e => {
  Draw.color(Color.rgb(Mathf.random(150, 255), Mathf.random(150, 255), Mathf.random(150, 255)));
  Fill.circle(e.x, e.y, e.fout() * 8 + 5);
  Draw.reset();
  Lines.spikes(e.x, e.y, Mathf.sinDeg(e.fout() * 160) * 20, Mathf.sinDeg(e.fout() * 50) * 5, 10, e.fout() * 360);
  Lines.stroke(e.fout() * 2);
  Lines.circle(e.x, e.y, e.fin() * 12 + 5);
  Lines.stroke(1);
})

const despawPew = new Effect(50, e => {
  Draw.color(Color.rgb(Mathf.random(150, 255), Mathf.random(150, 255), Mathf.random(150, 255)));
  Draw.alpha(0.2 + e.fin() * 0.8);
  Fill.circle(e.x, e.y, 0.2 + e.fout() * 11.8);
  Draw.color();
  Draw.color(Color.rgb(Mathf.random(150, 255), Mathf.random(150, 255), Mathf.random(150, 255)));
  Lines.stroke(e.fout() * 4);
  Lines.circle(e.x, e.y, e.fin() * 13);
  Draw.color();
  Lines.stroke(1);
})

const ShotEffect = new Effect(30, e => {
  Draw.color(Color.rgb(Mathf.random(150, 255), Mathf.random(150, 255), Mathf.random(150, 255)));
  
    Drawf.tri(e.x, e.y, e.fout() * 5, 50, e.rotation + 90)
  Drawf.tri(e.x, e.y, e.fout() * 5, 50, e.rotation - 90)
  Draw.reset();
})

const chargerShot = new Effect(180, e => {
  Draw.color(Color.rgb(Mathf.random(150, 255), Mathf.random(150, 255), Mathf.random(150, 255)));
  Fill.circle(e.x, e.y, e.fin() * 8 + 5);
  Draw.reset();
  Lines.spikes(e.x, e.y, Mathf.sinDeg(e.fin() * 160) * 20, Mathf.sinDeg(e.fin() * 50) * 5, 10, e.fin() * 360);
})

const chargerBending = new Effect(180, e => {
  Draw.color(Color.rgb(Mathf.random(150, 255), Mathf.random(150, 255), Mathf.random(150, 255)));
  Lines.stroke(e.fin() * 20);
  Lines.circle(e.x, e.y, e.fout() * 10);
  Lines.stroke(1);
})

const pew = extendContent(BasicBulletType, {
  damage: 0,
      speed: 2,
      lifetime: 300,
      collides: false,
      hitEffect: Fx.none,
      despawnEffect: despaw,
      shootEffect: ShotEffect,
      hitSound: Sounds.none,
      draw(e) {
        Draw.color(Color.rgb(Mathf.random(150, 255), Mathf.random(150, 255), Mathf.random(150, 255)));
        Fill.circle(e.x, e.y, 5);
        Draw.reset();
      },
      update(b) {
        if (Mathf.chance(0.3)) {
          Damage.damage(b.team, b.x, b.y, 5, 60, true, true);
        }
        if (Mathf.chance(0.5)) {
          Lightning.create(b, Color.rgb(Mathf.random(150, 255), Mathf.random(150, 255), Mathf.random(150, 255)), Mathf.randomSeed(b.id, 30, 60), b.x, b.y, Mathf.random(0, 360), Mathf.randomSeed(b.id, 5, 15));
        }
      }
})


const astroShot = extendContent(BasicBulletType, {
  damage: 0,
  speed: 2,
  lifetime: 300,
  collides: false,
  hitEffect: Fx.none,
  despawnEffect: despaw,
  shootEffect: ShotEffect,
  hitSound: Sounds.none,
  draw(e) {
    Draw.color(Color.rgb(Mathf.random(150, 255), Mathf.random(150, 255), Mathf.random(150, 255)));
    Fill.circle(e.x, e.y, 13);
    Draw.reset();
  },
  update(b) {
    if (Mathf.chance(0.3)) {
      Damage.damage(b.team, b.x, b.y, 13, 35, true, true);
    }
    if (Mathf.chance(0.5)) {
      Lightning.create(b, Color.rgb(Mathf.random(150, 255), Mathf.random(150, 255), Mathf.random(150, 255)), Mathf.randomSeed(b.id, 20, 40), b.x, b.y, Mathf.random(0, 360), Mathf.randomSeed(b.id, 10, 20));
    }
  },
  despawned(b) {
    this.despawnEffect.at(b.x, b.y, b.rotation(), this.hitColor);
    this.hitSound.at(b);
  
    Effect.shake(this.despawnShake, this.despawnShake, b);
  
    this.hit(b, b.x, b.y);
    for (let i = 0; i < 10; i++) {
      pew.create(b.owner, b.team, b.x, b.y, b.rotation() + 36 * i, 0.5);
    }
  },
})


const astro = extendContent(PowerTurret, "astro", {
  shootType: astroShot,
  chargeTime: 180,
  chargeEffects: 1,
  shootShake: 5,
  chargeEffect: chargerShot,
  chargeBeginEffect: chargerBending,
  chargeSound: SoundH.astroChar,
  shootSound: Sounds.laser
})