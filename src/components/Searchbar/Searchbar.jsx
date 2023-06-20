import PropTypes from 'prop-types'; 
import { useState } from 'react';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
    const [query, setQuery] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(query);
    };
    const handleChange = (e) => {
        setQuery(e.target.value);
    };
        return (
            <header className={css.Searchbar}>
                <form className={css.SearchForm} onSubmit={handleSubmit} >
                    <button className={css.SearchForm_button} type="submit">
                        <span className={css.SearchForm_text}>
                            Search
                        </span>
                    </button>
                    <input
                        className={css.SearchForm_input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={query}
                        onChange={handleChange}
                    />
                </form>
            </header>
        )
    }


Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};