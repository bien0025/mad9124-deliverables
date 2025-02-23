const create = (req, res, next) => {
    try {
        // Create a new car
        res.status(201).json({
            message: "Car created successfully",
        });
    } catch(err) {
        // passing the error to next here, and it will end up at our error handler!
        next(err);
    }
}