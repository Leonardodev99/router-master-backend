import Sequelize, { Model } from "sequelize";
import bcryptjs from "bcryptjs";

export default class User extends Model {
  static init(sequelize) {
    super.init({
      username: {
       type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [4,255],
            msg: 'Field name must have between 5 and 255 characters',
          },
          isNotStartWithNumber(value) {
              if(/^\d{2}/.test(value)) {
                throw new Error('username cannot start with two numbers');
              }

          },
        },
      },
      phone: {
       type: Sequelize.STRING,
       defaultValue: '',
       unique: {
        msg: 'Phone number already exists'
       },
       validate: {
        len: {
          args: [11,11],
          msg: 'Field phone must have exactly 9 numeric characters in format xxx xxx xxx',
        },
        is: {
          args: /^\d{3} \d{3} \d{3}$/,
          msg: 'Field phone must be in the format xxx xxx xxx'
        }
       },

      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email already exists'
        },
        validate: {
          isEmail: {
            msg: 'Invalid email',
          },
        },

       },
      password_hash: {
        type: Sequelize.STRING,
       },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6,15],
            msg: 'Field password must have between 6 and 50 characters',
          },
        },


       },
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
     if(user.password) {
      user.password_hash = await bcryptjs.hash(user.password, 8);
     }
    });

    return this;
  }
}
