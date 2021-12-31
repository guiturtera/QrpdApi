const Event = require('../../models/event');

const { dateToString } = require('../../helpers/date');
const { getUser, transformEvent } = require('./merge');


module.exports = {
    events: async () => {
        try {
            const events = await Event.find();//.populate('creator')
            return events.map((event) => {
                return transformEvent(event);
            });
        } catch (err) {
            throw err;
        }
    },

    createEvent: async (args) => {
        try {
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: dateToString(args.eventInput.date),
                creator: '61ce349f4a19449c8dd40fcd' 
            });
            
            const result = await event.save();    
            
            const user = await User.findById('61ce349f4a19449c8dd40fcd');
                
            if (!user) {
                throw new Error("User not found")
            }
            user.createdEvents.push(event);
            await user.save();
            
            return transformEvent(result);
        } catch (err) {
            throw err;
        }
    },
}