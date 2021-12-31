const Event = require('../../models/event');
const User = require('../../models/user');
const Booking = require('../../models/booking');

const { dateToString } = require('../../helpers/date');

const transformEvent = event => {
    return {
        ...event._doc,
        _id: event.id,
        date: dateToString(event._doc.date),
        creator: getUser.bind(this, event._doc.creator) 
    }    
}

const getUser = async userId => {
    try {
        const user = await User.findById(userId);
        return { 
            ...user._doc,
            _id: user.id,
            createdEvents: getEvents.bind(this, user._doc.createdEvents)
        };
    } catch (err) {
        throw err;
    }
}

const getEvent = async eventId => {
    try {
        const event = await Event.findById(eventId);
        return transformEvent(event);
    } catch (err) {
        throw err;
    }
}

const getEvents = async eventIds => {
    try {
        const events = await Event.find({ _id: { $in: eventIds } });
        
        return events.map(event => {  
            return transformEvent(event);
        })
    } catch (err) {
        throw err;
    }             
}

exports.getUser = getUser;
exports.getEvents = getEvents;
exports.getEvent = getEvent;
exports.transformEvent = transformEvent;