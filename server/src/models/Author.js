module.exports = (sequelize, DataTypes) => {
	const Author = sequelize.define('Author', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		phone_number:  {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		}
	})

	Author.associate = function(models) {
		Author.hasMany(models.Music, {
			foreignKey: 'AuthorId',
			onDelete: 'CASCADE'
		})
		Author.hasMany(models.Gang, {
			foreignKey: 'AuthorId',
			onDelete: 'CASCADE'
		})
		Author.belongsTo(models.Media, {
			foreignKey: 'MediaId',
			onDelete: 'CASCADE'
		})
	}
	
	return Author
}

