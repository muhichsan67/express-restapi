const db = require('../models')
const config = require('../config/auth.config')

const Op = db.Sequelize.Op
const { property } = require('../models')
var _template_return = {status: '', message: '', data: []}

function isUserExist(username, email, id) {
    var where_condition = [];
    if (username) where_condition.push({username: username})
    if (email) where_condition.push({email: email})
    if (id) where_condition.push({id: id})

    return User.findOne({
        where: {
            [Op.or]: where_condition
        }, attributes: ['id', 'username', 'password', 'name', 'email'], include: ['role']
    }).then(user => {
        var result = {
            status: false,
            message: '',
            data: user
        };
        if (user) {
            var msg = 'User already registered.'
            if (user.username == username) {
                msg = 'Username already registered.'
            }
            result.status = true
            result.message = msg
        } else {
            result.message = 'User not found'
        }
        return result
    })
}

exports.getProperty = async (req,res) => {
    result = _template_return

    try { 
      const properties = await property.findAll({
        include: { all: true, nested: true },
        order: [['property_date', 'DESC']]
      })

      const formattedProperties = properties.map(property => {
        // Rubah sequelize menjadi JS biasa
        const propertyObject = property.get({plain: true})

        const simpleTypes = propertyObject.types.map(t => t.property_type.name)
        const simpleImages = propertyObject.images.map(i => i.image)

        return {
          ...propertyObject,
          types: simpleTypes,
          images: simpleImages
        }
      })

      result.status = 'success'
      result.message = 'Properties retrieved successfully'
      result.data = formattedProperties
      res.status(200).send(result)
    } catch (error) {
      result.status = 'error'
      result.message = "Failed to retrieve data : " + error.message
      res.status(500).send(result)
    }

}