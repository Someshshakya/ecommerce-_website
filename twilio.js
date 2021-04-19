require('dotenv').config()
// +1518203377

module.exports = async(no) =>{
        try {
            const accountSid = process.env.TWILIO_ACCOUNT_SID;
            const authToken = process.env.TWILIO_AUTH_TOKEN;
            const client = require('twilio')(accountSid, authToken);
            const otp = Math.floor(100000 + Math.random() * 90000);
            client.messages
            .create({
                body: `Your One Time Password (OTP) :- ${otp}`,
                from : "+15182033775",
                to: no
            })
            return otp 
        } catch (error) {
            console.log(error)
        }            
}
