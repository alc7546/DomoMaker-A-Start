const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let DomoModel = {};

// mongoose.Types.ObjectID is a function that
// converts string ID to real mongo ID
const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const DomoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  age: {
    type: Number,
    min: 0,
    required: true,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  level: {
    type: Number,
    min: 0,
    required: true,
  },

  race: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  health: {
    type: Number,
    min: 0,
    required: true,
  },

  armor: {
    type: Number,
    min: 0,
    required: true,
  },

  gold: {
    type: Number,
    min: 0,
    required: true,
  },

  strength: {
    type: Number,
    min: 0,
    required: true,
  },

  agility: {
    type: Number,
    min: 0,
    required: true,
  },

  wisdom: {
    type: Number,
    min: 0,
    required: true,
  },

  endurance: {
    type: Number,
    min: 0,
    required: true,
  },

  defense: {
    type: Number,
    min: 0,
    required: true,
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

DomoSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
  level: doc.level,
  race: doc.race,
  health: doc.health,
  armor: doc.armor,
  gold: doc.gold,
  strength: doc.strength,
  agility: doc.agility,
  wisdom: doc.wisdom,
  endurance: doc.endurance,
  defense: doc.defense,
});

DomoSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };
  return DomoModel.find(search).select('name age level race health armor gold strength agility wisdom endurance defense').exec(callback);
};

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports.DomoModel = DomoModel;
module.exports.DomoSchema = DomoSchema;
