import {Component} from "react";
import MarvelService from "../../services/MarvelService";

import './charList.scss';
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        offset: 210,
        newCharLoading: false,
        charEnded: false,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onLoadNewChar();
    }

    onLoadNewChar = () => {
        this.onNewCharLoading();
        this.marvelService.getAllCharacters(this.state.offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onNewCharLoading = () => {
        this.setState({
            newCharLoading: true,
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;

        if (newCharList.length < 9){
            ended = true;
        }

        this.setState(({charList, offset}) => ({
            charList: [...charList, ...newCharList],
            offset: offset + 9,
            loading: false,
            error: false,
            newCharLoading: false,
            charEnded: ended,
        }))
    }

    onError = () => {
        this.setState({
            loading: false,
            newCharLoading: false,
            error: true,
        })
    }

    renderItems = (charList) => {
        const renderItem = (item) => {
            let imgStyle = {'objectFit': 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit': 'unset'};
            }

            return(
                <li key={item.id} onClick={() => this.props.onCharSelected(item.id)} className="char__item">
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        }

        return(
            <ul className="char__grid">
                {charList.map(renderItem)}
            </ul>
        )
    }

    render() {
        const {charList, loading, error, newCharLoading, charEnded} = this.state;
        const spinner = loading ? <Spinner/> : null;
        const newCharSpinner = newCharLoading && !loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const content = (spinner || errorMessage) ? null : this.renderItems(charList);

        return (
            <div className="char__list">

                {content}
                {spinner}
                {errorMessage}
                {newCharSpinner}

                <button className="button button__main button__long"
                        disabled={newCharLoading}
                        style={{'display': charEnded ? 'none' : 'block'}}
                        onClick={() => this.onLoadNewChar()}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

}

export default CharList;