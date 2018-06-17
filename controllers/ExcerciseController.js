const ExcerciseController = {
    index: (req, res) => {
        const data = {
            title: 'Excercise tracker'
        };

        return res.view('index', data);
    },
};

module.exports = ExcerciseController;