module.exports = (sequelize, DataTypes) => {
	const Bookmark = sequelize.define('Bookmark', {
		count: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		delivery: {
			type: DataTypes.STRING,
			allowNull: true
		}

	})

	Bookmark.associate = function(models) {
		Bookmark.belongsTo(models.Good, {
			foreignKey: 'GoodId',
			onDelete: 'CASCADE'
		})
		Bookmark.belongsTo(models.User, {
			foreignKey: 'UserId',
			onDelete: 'CASCADE'
		})
	}
	
	return Bookmark
}

