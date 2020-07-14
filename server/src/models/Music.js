module.exports = (sequelize, DataTypes) => {
	const Music = sequelize.define('Music', {
		name:  {
			type: DataTypes.STRING,
			allowNull: false
		}
		
	})

	Music.associate = function(models) {
		Music.hasMany(models.MusicProg, {
			foreignKey: 'MusicId',
			onDelete: 'CASCADE'
		})
		Music.belongsTo(models.Author, {
			foreignKey: 'AuthorId',
			onDelete: 'CASCADE'
		})
		Music.belongsTo(models.Media, {
			foreignKey: 'MediaId',
			onDelete: 'CASCADE'
		})
	}
	
	return Music
}

