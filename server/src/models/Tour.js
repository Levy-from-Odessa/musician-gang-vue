module.exports = (sequelize, DataTypes) => {
	const Tour = sequelize.define('Tour', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	})

	Tour.associate = function(models) {
		Tour.belongsTo(models.Concert, {
			foreignKey: 'ConcertId',
			onDelete: 'CASCADE'
		})
		Tour.hasMany(models.Mailing, {
			foreignKey: 'TourId',
			onDelete: 'CASCADE'
		})
	}
	
	return Tour
}

