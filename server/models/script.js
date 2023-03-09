async function loadDummyData(models) {
    const user = new models.user({
        name: "Sakshi Subedi",
        email: {
            isPublic: false,
            data: "sasubedi@ucsd.edu"
        },
        password: "Sakshi123",
        pronoun: "She/Her",
        age: {
            isPublic: false,
            data: 25
        },
        occupation: {
            isPublic: false,
            data: "Student"
        }
    });
    const userResponse = await user.save();

    const landlord = new models.landlord({
        name: "Sakshi Subedi",
        email: "sasubedi@ucsd.edu",
        password: "Sakshi123",
        pronoun: "She/Her",
        age: 25,
        phoneNo: "(619) 953-7077",
        introduction: "Hello, I am renting my house"
    })
    const landlordResponse = await landlord.save();

            
    const listing = new models.listing({
        name: "Palm Harbor",
        address: "2699 Green Valley, La Jolla, CA",
        rent: 2000,
        rating: 4.5,
        landlordId: landlordResponse._id, //mongoose.Types.ObjectId("63f10620bd3c661e18934201"),
        description: "The kitchen overlooks the Dinette that leads into the family room",
        media: [],
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 1200,
        hasPet: false,
        postalCode: "92092"
    });
    const listingResponse = await listing.save();

    const wishlist = new models.wishlist({
        listingId: listingResponse._id,
        userId: userResponse._id,
    })
    const wishlistResponse = await wishlist.save();

    const comment = new models.comment({
        listingId: listingResponse._id,
        userId: userResponse._id,
        comment: "The house is really good",
        media: [],
    })
    const commentResponse = await comment.save();

    const replyComment = new models.comment({
        parentId: commentResponse._id,
        listingId: listingResponse._id,
        userId: userResponse._id,
        comment: "The house is really really really good",
        media: [],
    })
    const replyResponse = await replyComment.save();

    const like = new models.like({
        commentId: commentResponse._id,
        userId: userResponse._id,
    })
    const likeResponse = await like.save();

    const rating = new models.rating({
        listingId: listingResponse._id,
        userId: userResponse._id,
        rating: 4
    })
    const ratingResponse = await rating.save();
}

module.exports = loadDummyData;