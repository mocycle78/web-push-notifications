const webPush = require('web-push');
const faker = require('faker');

const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/d_qM5u3ma7s:APA91bGha4864azPz_N1DgJWmUaJtelWOdVVA_7CxBP5zJoktuc_fH6hdVbIajErr0Od2PJC3UtsLuoojQG22QKlL1-N1JZwNmHI_bnYuNe6umVKyR1JLiYcGgpZm7rI0TpNMrQEuXNI",
    "expirationTime": null,
    "keys": {
        "p256dh": "BPDp92oAt2hgg4wJusTIpMX3qvcmPUfc2ixR-slItAzGqAES0Vw5g-uGcnIfXoBO4Itv4UlozLCZhmkYaCkhzRg",
        "auth": "pngwhovx3evhNhxTIYQSCg"
    }
}

const vapidPublicKey = 'BJmcshoxKr9b55-mYsvRPBmdJHISiArTp7fU88FIKKlUERbfS3m_9UUxwDoLHv0O9GICclyBdUAOj2mTJrGJnuw';
const vapidPrivateKey = '0l2AnT8Ummdy_yttA7fH_TJD6b29AYhLBux3xLEehqY';

const options = {
    TTL: 60,
    vapidDetails: {
        subject: 'mailto: mocycle78@yahoo.com',
        publicKey: vapidPublicKey,
        privateKey: vapidPrivateKey
    }
};

const notify = (subscribers) => {
    const transaction = faker.helpers.createTransaction()

    if (subscribers.size < 1) {
        console.log("No subscribers to notify");
        return;
    }

    subscribers.forEach((subscriber, id) => {
        webPush.sendNotification(
                subscriber,
                JSON.stringify(transaction),
                options
            )
            .then(() => console.log(`${subscribers.size} subscribers notified.`))
            .catch(error => console.error('Error in pushing notification', error))
    })
}

module.exports = {
    notify: notify
}