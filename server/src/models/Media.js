module.exports = (sequelize, DataTypes) => {
	const Media = sequelize.define('Media', {
		URL: {
			type: DataTypes.TEXT,
			allowNull: false,
			// set      : function(val) {
			// 	this.setDataValue('URL', require(`../../../../media/${val}`));
			// }
		}
	})

	
	Media.associate = function(models) {
		Media.hasMany(models.Mailing, {
			foreignKey: 'MediaId',
			onDelete: 'CASCADE'
		})
		Media.hasMany(models.Music, {
			foreignKey: 'MediaId',
			onDelete: 'CASCADE'
		})
		Media.hasMany(models.Author, {
			foreignKey: 'MediaId',
			onDelete: 'CASCADE'
		})
		Media.hasMany(models.Good, {
			foreignKey: 'MediaId',
			onDelete: 'CASCADE'
		})
		Media.hasMany(models.Concert, {
			foreignKey: 'MediaId',
			onDelete: 'CASCADE'
		})
	}
	
	return Media
}

