const Booking = require('../../models/booking');
const Event = require('../../models/event');

const { getUser, getEvent, transformEvent } = require('./merge');
const { dateToString } = require('../../helpers/date');

const transformBooking = booking => {
    return { 
        ...booking._doc,
        user: getUser.bind(this, booking._doc.user),
        event: getEvent.bind(this, booking._doc.event),
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt)
    }
}

module.exports = { 
    bookings: async () => {
        try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return transformBooking(booking)
            })
        } catch (err) {
            throw err;
        }
    },
    
    bookEvent: async args => {
        const event = await Event.findById(args.eventId);
        if (!event) {
            throw new Error(`Event not found! ${event}`);
        }
        const booking = new Booking({
            user: '61ce349f4a19449c8dd40fcd',
            event
        });

        let result = await booking.save();

        return transformBooking(result);
    },

    cancelBooking: async args => {
        try {
            const booking = await Booking.findById(args.bookingId).populate('event');

            const event = transformEvent(booking.event);

            await Booking.deleteOne({ _id: args.bookingId });
            return event;
        } catch (err) {
            throw err;
        }
    }

}