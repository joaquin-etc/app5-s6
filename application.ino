// Joaquin Faundez et Adam Beliveau
// app5_s6gi fauj3006 bela1003

#include <../lib/BeaconScanner/src/BeaconScanner.h>
#include "Particle.h"

int PIN_LED = D7;
int val = LOW;

void onCallBack(Beacon &, callback_type);

int switchLed();

void setup()
{
  BLE.on();
  Scanner.setCallback(onCallback);
  Scanner.setScanPeriod(1);
  Scanner.startContinuous();

  Serial.begin(9600L);

  pinMode(PIN_LED, OUTPUT);

  Particle.function("led", switchLed);
}

void loop()
{
  Scanner.loop();
}

// beacon scanner s'occupe des evenements en continue, et lorsqu'il y en a un de nouveau nous le publions et si c'est un enter ou left
void onCallback(Beacon &beacon, callback_type type)
{
  String data = String(beacon.getAddress().toString().c_str());
  String action = (type == NEW) ? "Entered" : "Left";
  Particle.publish(action, data);
}

// simplement changer la valeur courante de la LED
int switchLed()
{
  val = !val;

  digitalWrite(PIN_LED, val);

  return 1;
}