import { UserModel } from "../models/userModel.js";
import { QuoteModel } from "../models/quoteModel.js";

UserModel.hasMany(QuoteModel, { foreignKey: 'userId' });
QuoteModel.belongsTo(UserModel, { foreignKey: 'userId' });

export { UserModel, QuoteModel };