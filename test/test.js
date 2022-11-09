import chai from 'chai'
import chaiHttp from 'chai-http';
import server from '../src/index.js'

chai.should();
chai.use(chaiHttp);

describe('Endpoints test', () => {

    describe('Get files data', () => {
        it('It should get a list of files', (done) => {
            chai.request(server)
                .get('/files/data')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.should.be.a('object')
                    done();
                })
        })
    })
    describe('Get just one file', () => {
        it('Only the file from the name query param', (done) => {
            chai.request(server)
                .get('/files/data?name=test9.csv')
                .end((err, res) => {
                    let data = res.body
                    res.should.have.status(200)
                    res.should.be.a('object')
                    res.body.should.have.property('filesList')
                    res.body.filesList.should.have.a.lengthOf(1)
                    done();
                })
        })
    })

    describe('Get list of filenames', () => {
        it('Optional request', (done) => {
            chai.request(server)
                .get('/files/list')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('files')
                    res.body.files.should.have.a.lengthOf(7)
                    done();
                })
        })
    })

})