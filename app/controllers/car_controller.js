const Car = require('../models/car_model');

exports.index = (req, res) => {
  Car.find((err, cars) => {
    if (err) return res.status(500).json(err);
    if (!cars) return res.json([]);
    res.send(cars);
  });
}

exports.create = (req, res) => {
  const body = req.body
  let car = new Car({
    brand: body.brand,
    model: body.model,
    color: body.color,
    fuel: body.fuel,
    year: body.year,
    price: body.price,
    user: req.userId
  });

  car.save( (err) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json({success: true, id: car.id});
  })
}

exports.details = (req, res) => {
  Car.findById(req.params.id, (err, car) => {
    if (err) return res.status(500).json(err);
    if (!car) return res.json({});
    res.send(car);
  })
};

exports.update = (req, res) => {
  const body = req.body;
  Car.findById(req.params.id, (err, car) => {
    if (err) return res.status(500).json(err);
    if (!car){
      return res.status(400).json({error: "Car not find"});
    }
    if (car.user != req.userId) {
      return res.status(401).json({error: "Wrong user credentials"});
    }
    car.brand = body.brand || car.brand;
    car["model"] = body.model || car["model"];
    car.color = body.color || car.color;
    car.fuel = body.fuel || car.fuel;
    car.year = body.year || car.year;
    car.price = body.price || car.price;
    car.save((err, updatedCar) => {
      if(err) return res.status(500).json(err);
      res.json({success: true, car: updatedCar});
    })
  })
}

exports.delete = (req, res) => {
  const id = req.params.id
  Car.findById(id, (err, car) => {
    if (err) return res.status(500).json(err);
    if (!car){
      return res.status(400).json({error: "Car not find"});
    }
    if (car.user != req.userId) {
      return res.status(401).json({error: "Wrong user credentials"});
    }
    Car.findByIdAndDelete( id, (err) => {
      if(err) return res.status(500).json(err);
      res.json({success: true});
    })
  })
}