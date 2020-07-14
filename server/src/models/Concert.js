module.exports = (sequelize, DataTypes) => {
	const Concert = sequelize.define('Concert', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		place: {
			type: DataTypes.STRING,
			allowNull: false
		},
		ticketsCount:  {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		start:  {
			type: DataTypes.DATEONLY,
			allowNull: false
		}
	})

	Concert.associate = function(models) {
		Concert.hasMany(models.Tour, {
			foreignKey: 'ConcertId',
			onDelete: 'CASCADE'
		})
		Concert.hasOne(models.Good, {
			foreignKey: 'ConcertId',
			onDelete: 'CASCADE'
		})
		Concert.hasMany(models.MusicProg, {
			foreignKey: 'ConcertId',
			onDelete: 'CASCADE',
			allowNull:true
		})
		Concert.belongsTo(models.Media, {
			foreignKey: 'MediaId',
			onDelete: 'CASCADE'
		})
		// Concert.hasMany(models.Concert, {
		// 	foreignKey: 'ConcertId',
		// 	onDelete: 'CASCADE'
		// })
	}

	return Concert
}

