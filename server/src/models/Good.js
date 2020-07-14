module.exports = (sequelize, DataTypes) => {
	const Good = sequelize.define('Good', {
		name: {
			type: DataTypes.STRING,
			allowNull:false
		},
		count:{
			type: DataTypes.INTEGER,
			allowNull:false
		},
		price:{
			type: DataTypes.FLOAT,
			allowNull:false
		},
		type:{
			type: DataTypes.STRING,
			allowNull:false
		}
		
	})

	Good.associate = function(models) {
		Good.hasMany(models.Bookmark, {
			foreignKey: 'GoodId',
			onDelete: 'CASCADE'
		})
		Good.belongsTo(models.Concert, {
			foreignKey: 'ConcertId',
			onDelete: 'CASCADE',
			allowNull:true
		})
		Good.belongsTo(models.Media, {
			foreignKey: 'MediaId',
			onDelete: 'CASCADE'
		})
	}
	
	return Good
}

