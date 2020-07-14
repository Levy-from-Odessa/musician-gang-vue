module.exports = (sequelize) => {
	const UserMailing = sequelize.define('UserMailing', {
		
	})

	UserMailing.associate = function(models) {
		UserMailing.belongsTo(models.Mailing, {
			foreignKey: 'MailingId',
			onDelete: 'CASCADE'
		})
		UserMailing.belongsTo(models.User, {
			foreignKey: 'UserId',
			onDelete: 'CASCADE'
		})
	}
	
	return UserMailing
}

