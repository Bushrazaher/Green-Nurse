import React from 'react'
import background from '../Images/bg2.jpeg';
import logo from '../Images/logo.png';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateSeedling, getSeedlingById } from '../Features/ImportedSeedlingSlice';

export default function UpdateImpotredSeedling() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentSeedling } = useSelector(state => state.seedlings);
    
    const [name, setName] = useState(null);
    const [type, setType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [total, setTotal] = useState(0);

    useEffect(() => {
        console.log('Fetching seedling with ID:', id);
        dispatch(getSeedlingById(id));
    }, [dispatch, id]);

    useEffect(() => {
        console.log('Current seedling data:', currentSeedling);
        if (currentSeedling) {
            console.log('Setting name to:', { value: currentSeedling.name, label: currentSeedling.name });
            setName({ value: currentSeedling.name, label: currentSeedling.name });
            setType(currentSeedling.type);
            setQuantity(currentSeedling.quantity);
            setPrice(currentSeedling.price);
            setTotal(currentSeedling.total);
        }
    }, [currentSeedling]);

    // Calculate total whenever quantity or price changes
    useEffect(() => {
        const calculatedTotal = parseFloat(quantity || 0) * parseFloat(price || 0);
        setTotal(isNaN(calculatedTotal) ? 0 : calculatedTotal);
    }, [quantity, price]);

    const handleChange = (e) => {
        setType(e.target.value);
    };

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const options = [
        { value: 'Bauhinia', label: 'Bauhinia' },
        { value: 'Jacaranda', label: 'Jacaranda' },
        { value: 'Callistemon', label: 'Callistemon' },
        { value: 'Mirabilis', label: 'Mirabilis' },
        { value: 'Juglans', label: 'Juglans' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            alert('Please select a seedling name');
            return;
        }
        
        const Data = {
            name: name.value,
            type: type,
            quantity: Number(quantity),
            price: Number(price),
            total: Number(total)
        };

        dispatch(updateSeedling({ id, Data }))
            .then(() => {
                navigate('/home');
            })
            .catch((error) => {
                console.error('Update failed:', error);
                alert('Failed to update seedling. Please try again.');
            });
    };

    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={{
                backgroundColor: 'rgba(250, 249, 249, 0.36)',
                borderRadius: '10px',
                padding: '59px',
                width: '100%',
                maxWidth: '500px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
            }}>
                <img 
                    src={logo} 
                    alt="Company Logo" 
                    style={{ 
                        width: '180px',
                        height: 'auto',
                        margin: '0 auto 30px',
                        display: 'block'
                    }} 
                />
                <form onSubmit={handleSubmit}>
                    <div style={{ width: '300px' }}>
                        <h3>Seedling Name:</h3>
                        <Select
                            value={name}
                            onChange={setName}
                            options={options}
                            placeholder="Select a Seedling Name .."
                        />
                    </div>
                    <div>
                        <h3>Type:</h3>
                        <label>
                            <input
                                type="radio"
                                value="Productive seedlings"
                                checked={type === 'Productive seedlings'}
                                onChange={handleChange}
                            />
                            Productive seedlings
                        </label>
                        <div style={{ margin: "5px", padding: "5px" }}></div>
                        <label>
                            <input
                                type="radio"
                                value="Non-productive seedlings"
                                checked={type === 'Non-productive seedlings'}
                                onChange={handleChange}
                            />
                            Non-productive seedlings
                        </label>
                    </div>
                    <div>
                        <h3>Quantity:</h3>
                        <input
                            style={{
                                width: '60%',
                                padding: '10px 10px',
                                borderRadius: '5px',
                                fontSize: '16px',
                                boxSizing: 'border-box'
                            }}
                            type='number'
                            min="1"
                            placeholder='Quantity'
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                    </div>
                    <div>
                        <h3>Price:</h3>
                        <input
                            style={{
                                width: '60%',
                                padding: '10px 10px',
                                borderRadius: '5px',
                                fontSize: '16px',
                                boxSizing: 'border-box'
                            }}
                            type='number'
                            min="0.01"
                            step="0.01"
                            placeholder='Price'
                            value={price}
                            onChange={handlePriceChange}
                        />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <h3>Total: ${total.toFixed(2)}</h3>
                    </div>
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '14px',
                            backgroundColor: '#2e8b57',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            marginBottom: '20px',
                            transition: 'background-color 0.3s',
                            ':hover': {
                                backgroundColor: '#3aa76d'
                            }
                        }}>
                        UPDATE
                    </button>
                </form>
            </div>
        </div>
    );
}
