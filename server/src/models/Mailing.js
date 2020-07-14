module.exports = (sequelize) => {
	const Mailing = sequelize.define('Mailing', {
	})

	
	Mailing.associate = function(models) {
		Mailing.hasMany(models.UserMailing, {
			foreignKey: 'MailingId',
			onDelete: 'CASCADE'
		})
		Mailing.belongsTo(models.Tour, {
			foreignKey: 'TourId',
			onDelete: 'CASCADE'
		})
		Mailing.belongsTo(models.Concert, {
			foreignKey: 'ConcertId',
			onDelete: 'CASCADE'
		})
		Mailing.belongsTo(models.Media, {
			foreignKey: 'MediaId',
			onDelete: 'CASCADE'
		})
	}
	return Mailing
}

