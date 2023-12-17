const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  count: { type: Number, default: 0 },
  field: String,
});

let Counter;
try {
  // Try to get the existing model
  Counter = mongoose.model("Counter");
} catch (error) {
  // If the model doesn't exist, create it
  Counter = mongoose.model("Counter", counterSchema);
}
function autoIncrementPlugin(schema, options) {
  const { modelName, field } = options;

  const CounterModel = mongoose.model("Counter");
  schema.pre("save", async function (next) {
    if (!this.isNew) {
      return next();
    }

    try {
      const counter = await CounterModel.findOneAndUpdate(
        { _id: modelName, field: field },
        { $inc: { count: 1 } },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      this[field] = counter.count;
      next();
    } catch (error) {
      next(error);
    }
  });
}

module.exports = autoIncrementPlugin;
