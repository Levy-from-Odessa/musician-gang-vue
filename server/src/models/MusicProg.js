module.exports = (sequelize) => {
	const MusicProg = sequelize.define('MusicProg', {
		
	})

	MusicProg.associate = function(models) {
		MusicProg.belongsTo(models.Concert, {
			foreignKey: 'ConcertId',
			onDelete: 'CASCADE'
		})
		MusicProg.belongsTo(models.Music, {
			foreignKey: 'MusicId',
			onDelete: 'CASCADE'
		})
	}
	
	return MusicProg
}

