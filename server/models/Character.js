const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let CharacterModel = {};

// mongoose.Types.ObjectID is a function that
// converts string ID to real mongo ID
const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const CharacterSchema = new mongoose.Schema({
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

CharacterSchema.statics.toAPI = (doc) => ({
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

CharacterSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };
  return CharacterModel.find(search).select('name age level race health armor gold strength agility wisdom endurance defense').exec(callback);
};

CharacterModel = mongoose.model('Character', CharacterSchema);

module.exports.CharacterModel = CharacterModel;
module.exports.CharacterSchema = CharacterSchema;
