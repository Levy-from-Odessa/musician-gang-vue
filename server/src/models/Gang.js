module.exports = (sequelize, DataTypes) => {
	const Gang = sequelize.define('Gang', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
		
	})

	Gang.associate = function(models) {
		Gang.belongsTo(models.Author, {
			foreignKey: 'AuthorId',
			onDelete: 'CASCADE'
		})
		
	}
	
	return Gang
}

