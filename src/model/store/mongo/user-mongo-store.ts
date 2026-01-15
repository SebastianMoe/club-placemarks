import { Schema, model, isValidObjectId } from "mongoose";
import type { User, NewUser } from "../../interface/user.js";
import type { UserStore } from "../../db.js";

const userSchema = new Schema<User>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  aboutMe: String,
  imageUrl: String,
  scope: [String],
});

const UserMongoose = model<User>("User", userSchema);

export const userMongoStore: UserStore = {
  async getAll(): Promise<User[]> {
    const users = await UserMongoose.find().lean();
    return users.map((u: any) => ({ ...u, _id: u._id.toString() })) as User[];
  },

  async getById(userId: string): Promise<User | null> {
    if (!isValidObjectId(userId)) return null;
    const user = await UserMongoose.findOne({ _id: userId }).lean();
    if (!user) return null;
    return { ...user, _id: user._id.toString() } as User;
  },

  async getByEmail(email: string): Promise<User | null> {
    const user = await UserMongoose.findOne({ email }).lean();
    if (!user) return null;
    return { ...user, _id: user._id.toString() } as User;
  },

  async create(newUser: NewUser): Promise<User> {
    const user = new UserMongoose({ ...newUser, scope: ["user"] });
    await user.save();
    return { ...user.toObject(), _id: user._id.toString() } as User;
  },

  async update(user: User): Promise<User | null> {
      const { _id, ...updateData } = user;
      const updatedUser = await UserMongoose.findOneAndUpdate({ _id: _id }, updateData, { new: true }).lean();
      if (!updatedUser) return null;
      return { ...updatedUser, _id: updatedUser._id.toString() } as User;
  },

  async deleteAll(): Promise<User[]> {
      const allUsers = await this.getAll();
      await UserMongoose.deleteMany({});
      return allUsers;
  },
  
  async deleteById(userId: string): Promise<User | null> {
      const user = await this.getById(userId);
      if(!user) return null;
      await UserMongoose.deleteOne({ _id: userId });
      return user;
  }
};
